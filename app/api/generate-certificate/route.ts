import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const { name, project, date, days } = await req.json();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 420]);
  const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  const blue = rgb(33 / 255, 150 / 255, 243 / 255); // #2196F3
  const background = rgb(227 / 255, 242 / 255, 253 / 255); // #E3F2FD

  // Fondo plano celeste
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: background,
  });

  const drawCenteredText = (
    text: string,
    y: number,
    font: any,
    size: number,
    color = rgb(0, 0, 0)
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (pageWidth - textWidth) / 2,
      y,
      size,
      font,
      color,
    });
  };

  // Logo de Dexpert
  const logoPath = path.join(process.cwd(), "public", "lgo.png"); // asegúrate que sea "logo.png"
  const logoBytes = await readFile(logoPath);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.4);
  page.drawImage(logoImage, {
    x: (pageWidth - logoDims.width) / 2,
    y: 330,
    width: logoDims.width,
    height: logoDims.height,
  });

  // Contenido del certificado
  drawCenteredText("Certificate of Completion", 290, fontTitle, 22, blue);
  drawCenteredText("Dexpert certifies that", 260, fontBody, 14);
  drawCenteredText(name, 235, fontTitle, 18, blue);
  drawCenteredText("has successfully completed the project: ", 210, fontBody, 14);
  drawCenteredText(`"${project}"`, 185, fontTitle, 16, blue);
  drawCenteredText(`with a total of: ${days} days`, 160, fontBody, 14);

  // Firma
  const firmaPath = path.join(process.cwd(), "public", "firma.png");
  const firmaBytes = await readFile(firmaPath);
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
  drawCenteredText(date, 15, fontBody, 12);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=certificate-${name}.pdf`,
    },
  });
}
