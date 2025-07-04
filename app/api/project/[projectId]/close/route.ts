import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { uploadPDFtoCloudinary } from "@/lib/cloudinary-upload";

export async function POST(
  request: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const params = await context.params;
    const projectId = params.projectId;

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const approvedApplications = await prisma.application.findMany({
      where: { projectId, status: "approved" },
      include: { student: true },
    });

    const logoPath = path.join(process.cwd(), "public", "lgo.png");
    const signaturePath = path.join(process.cwd(), "public", "firma.png");
    const [logoBytes, signatureBytes] = await Promise.all([
      readFile(logoPath),
      readFile(signaturePath),
    ]);

    for (const application of approvedApplications) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 420]);
      const { width, height } = page.getSize();

      const gray = rgb(0.2, 0.2, 0.2);
      const lightGray = rgb(0.4, 0.4, 0.4);
      const accentBlue = rgb(33 / 255, 150 / 255, 243 / 255);

      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      const drawCenteredText = (
        text: string,
        y: number,
        font: any,
        size: number,
        color = gray
      ) => {
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y,
          size,
          font,
          color,
        });
      };

      const embeddedLogo = await pdfDoc.embedPng(logoBytes);
      const logoScaledDims = embeddedLogo.scale(0.25);
      page.drawImage(embeddedLogo, {
        x: (width - logoScaledDims.width) / 2,
        y: height - 60 - logoScaledDims.height / 2,
        width: logoScaledDims.width,
        height: logoScaledDims.height,
      });

      drawCenteredText("CERTIFICATE OF COMPLETION", height - 140, fontBold, 26, accentBlue);
      drawCenteredText("This certifies that", height - 180, fontRegular, 16, lightGray);
      drawCenteredText(application.student.fullName.toUpperCase(), height - 215, fontBold, 28, gray);
      drawCenteredText("has successfully completed the project:", height - 250, fontRegular, 16, lightGray);
      drawCenteredText(`"${project.title}"`, height - 275, fontItalic, 20, gray);
      drawCenteredText("with outstanding dedication and skill.", height - 300, fontRegular, 16, lightGray);

      page.drawLine({
        start: { x: width * 0.2, y: 140 },
        end: { x: width * 0.8, y: 140 },
        thickness: 0.5,
        color: lightGray,
      });

      const embeddedSignature = await pdfDoc.embedPng(signatureBytes);
      const signatureScaledDims = embeddedSignature.scale(0.03);
      page.drawImage(embeddedSignature, {
        x: (width - signatureScaledDims.width) / 2,
        y: 80,
        width: signatureScaledDims.width,
        height: signatureScaledDims.height,
      });

      drawCenteredText("Rodrigo Campos", 60, fontBold, 12, gray);
      drawCenteredText("Director, Dexpert", 45, fontRegular, 10, lightGray);

      page.drawText(
        `Issued on: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        {
          x: width - 200,
          y: 20,
          size: 10,
          font: fontRegular,
          color: lightGray,
        }
      );

      const pdfBytes = await pdfDoc.save();
      const fileName = `certificate-${application.student.id}-${project.id}`;

      const url = await uploadPDFtoCloudinary(Buffer.from(pdfBytes), fileName);

      await prisma.certificate.create({
        data: {
          applicationId: application.id,
          url,
        },
      });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status: "closed" },
    });

    return NextResponse.json({
      success: true,
      message: "Project closed and certificates generated",
    });
  } catch (error: any) {
    console.error("Error generating or uploading certificate:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
