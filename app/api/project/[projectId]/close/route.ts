import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function POST(
  req: Request,
  context: { params: { projectId: string } }
) {
  try {
    const { params } = await context; // <-- IMPORTANTÍSIMO
    const projectId = params.projectId;

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== userId)
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });

    const approvedApplications = await prisma.application.findMany({
      where: { projectId, status: "approved" },
      include: { student: true },
    });

    const certificateDir = path.join(process.cwd(), "public", "certificates");
    await mkdir(certificateDir, { recursive: true });

    const logoPath = path.join(process.cwd(), "public", "lgo.png");
    const firmaPath = path.join(process.cwd(), "public", "firma.png");
    const logoBytes = await readFile(logoPath);
    const firmaBytes = await readFile(firmaPath);

    for (const app of approvedApplications) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 420]);
      const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pageWidth = page.getWidth();
      const background = rgb(227 / 255, 242 / 255, 253 / 255);
      const blue = rgb(33 / 255, 150 / 255, 243 / 255);

      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: page.getHeight(),
        color: background,
      });

      const drawCenteredText = (text: string, y: number, font: any, size: number, color = rgb(0, 0, 0)) => {
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (pageWidth - textWidth) / 2,
          y,
          size,
          font,
          color,
        });
      };

      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.4);
      page.drawImage(logoImage, {
        x: (pageWidth - logoDims.width) / 2,
        y: 330,
        width: logoDims.width,
        height: logoDims.height,
      });

      drawCenteredText("Certificate of Completion", 290, fontTitle, 22, blue);
      drawCenteredText("Dexpert certifies that", 260, fontBody, 14);
      drawCenteredText(app.student.fullName, 235, fontTitle, 18, blue);
      drawCenteredText("has successfully completed the project:", 210, fontBody, 14);
      drawCenteredText(project.title, 185, fontTitle, 16, blue);
      drawCenteredText("with great performance.", 160, fontBody, 14);

      const firmaImage = await pdfDoc.embedPng(firmaBytes);
      page.drawImage(firmaImage, {
        x: 250,
        y: 80,
        width: 100,
        height: 30,
      });

      drawCenteredText("Rodrigo Campos", 60, fontBody, 10, blue);
      drawCenteredText("Director of Dexpert", 48, fontBody, 10);
      drawCenteredText("Issued on", 30, fontBody, 12);
      drawCenteredText(new Date().toLocaleDateString(), 15, fontBody, 12);

      const pdfBytes = await pdfDoc.save();
      const filename = `cert-${app.student.id}-${project.id}.pdf`;
      const filePath = path.join(certificateDir, filename);
      await writeFile(filePath, pdfBytes);

      await prisma.certificate.create({
        data: {
          applicationId: app.id,
          url: `/certificates/${filename}`,
        },
      });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status: "closed" },
    });

    return NextResponse.json({ message: "Project closed and certificates created" });
  } catch (error: any) {
    console.error("[CLOSE_PROJECT_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
