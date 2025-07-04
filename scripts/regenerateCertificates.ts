// scripts/regenerateCertificates.ts
import prisma from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { uploadPDFtoCloudinary } from "@/lib/cloudinary-upload";

async function regenerate() {
  const applications = await prisma.application.findMany({
    where: {
      status: "approved",
      certificate: {
        url: {
          endsWith: ".pdf.pdf", // solo los que tienen mal la URL
        },
      },
    },
    include: {
      student: true,
      project: true,
      certificate: true,
    },
  });

  const logoPath = path.join(process.cwd(), "public", "lgo.png");
  const signaturePath = path.join(process.cwd(), "public", "firma.png");
  const [logoBytes, signatureBytes] = await Promise.all([
    readFile(logoPath),
    readFile(signaturePath),
  ]);

  for (const app of applications) {
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
    const logoDims = embeddedLogo.scale(0.12);
    page.drawImage(embeddedLogo, {
      x: (width - logoDims.width) / 2,
      y: height - 60 - logoDims.height / 2,
      width: logoDims.width,
      height: logoDims.height,
    });

    drawCenteredText("CERTIFICATE OF COMPLETION", height - 140, fontBold, 26, accentBlue);
    drawCenteredText("This certifies that", height - 180, fontRegular, 16, lightGray);
    drawCenteredText(app.student.fullName.toUpperCase(), height - 215, fontBold, 28, gray);
    drawCenteredText("has successfully completed the project:", height - 250, fontRegular, 16, lightGray);
    drawCenteredText(`"${app.project.title}"`, height - 275, fontItalic, 20, gray);
    drawCenteredText("with outstanding dedication and skill.", height - 300, fontRegular, 16, lightGray);

    page.drawLine({
      start: { x: width * 0.2, y: 140 },
      end: { x: width * 0.8, y: 140 },
      thickness: 0.5,
      color: lightGray,
    });

    const embeddedSignature = await pdfDoc.embedPng(signatureBytes);
    const signatureDims = embeddedSignature.scale(0.08);
    page.drawImage(embeddedSignature, {
      x: (width - signatureDims.width) / 2,
      y: 80,
      width: signatureDims.width,
      height: signatureDims.height,
    });

    drawCenteredText("Rodrigo Campos", 60, fontBold, 12, gray);
    drawCenteredText("Director, Dexpert", 45, fontRegular, 10, lightGray);

    page.drawText(`Issued on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`, {
      x: width - 200,
      y: 20,
      size: 10,
      font: fontRegular,
      color: lightGray,
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `certificate-${app.student.id}-${app.project.id}`;
    const url = await uploadPDFtoCloudinary(Buffer.from(pdfBytes), fileName);

    await prisma.certificate.update({
      where: { id: app.certificate!.id },
      data: { url }, // sobreescribe la URL mala con la nueva buena
    });

    console.log(`✅ Regenerado: ${fileName}`);
  }

  console.log("🎉 Certificados actualizados.");
}

regenerate().catch((err) => {
  console.error("❌ Error al regenerar certificados:", err);
  process.exit(1);
});
