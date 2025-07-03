import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { uploadPDFtoCloudinary } from "@/lib/cloudinary-upload"; // Mantén Cloudinary, asumo que ya funciona.

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const approvedApplications = await prisma.application.findMany({
      where: { projectId, status: "approved" },
      include: { student: true },
    });

    const logoPath = path.join(process.cwd(), "public", "lgo.png"); // Asegúrate que este logo sea minimalista o que se vea bien en blanco y negro.
    const signaturePath = path.join(process.cwd(), "public", "firma.png"); // Una firma limpia o estilizada.
    const [logoBytes, signatureBytes] = await Promise.all([
      readFile(logoPath),
      readFile(signaturePath)
    ]);

    for (const application of approvedApplications) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 420]); // Mantén el tamaño para un formato horizontal de certificado.
      const { width, height } = page.getSize();
      
      // --- Colores y Fuentes (Minimalismo en la Selección) ---
      // Usaremos solo dos tonos de gris o un gris y un azul sutil.
      const gray = rgb(0.2, 0.2, 0.2); // Gris oscuro para la mayoría del texto
      const lightGray = rgb(0.4, 0.4, 0.4); // Gris más claro para texto secundario
      const accentBlue = rgb(33/255, 150/255, 243/255); // Tu azul actual, usado muy sutilmente.

      // Fuentes: Helvetica es un buen inicio para el minimalismo.
      // Considera Helvetica-Bold y Helvetica para contraste.
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique); // Para un toque de distinción en el título.

      // --- Funciones Auxiliares para Limpieza del Código ---
      const drawCenteredText = (text: string, y: number, font: any, size: number, color = gray) => {
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y,
          size,
          font,
          color,
        });
      };

      // --- Diseño Minimalista de Elementos ---

      // 1. Fondo (Opcional, si quieres un fondo muy sutil o blanco puro)
      // Para un minimalismo extremo, no dibujes ningún fondo y deja el blanco por defecto.
      // Si quieres un toque muy sutil de color, un blanco roto o gris muy claro:
      // page.drawRectangle({
      //   x: 0,
      //   y: 0,
      //   width: width,
      //   height: height,
      //   color: rgb(0.98, 0.98, 0.98), // Blanco roto muy sutil
      // });


      // 2. Logo (Posición y Escala Ajustadas para Minimalismo)
      // Coloca el logo en la parte superior central, sin que sea demasiado grande.
      const embeddedLogo = await pdfDoc.embedPng(logoBytes);
      const logoScaledDims = embeddedLogo.scale(0.12); // Más pequeño para que no domine
      page.drawImage(embeddedLogo, {
        x: (width - logoScaledDims.width) / 2,
        y: height - 60 - logoScaledDims.height / 2, // Centrado verticalmente en el top-margin
        width: logoScaledDims.width,
        height: logoScaledDims.height,
      });

      // 3. Título Principal (Con espacio y tipografía destacada)
      // Espacio superior generoso
      drawCenteredText("CERTIFICATE OF COMPLETION", height - 140, fontBold, 26, accentBlue); // Más grande y en color acento
      
      // Pequeño subtítulo introductorio
      drawCenteredText("This certifies that", height - 180, fontRegular, 16, lightGray);

      // 4. Nombre del Estudiante (El foco principal después del título)
      // Más grande y en negrita para destacar.
      drawCenteredText(application.student.fullName.toUpperCase(), height - 215, fontBold, 28, gray); // Mayúsculas para impacto

      // 5. Detalles del Proyecto (Texto de apoyo, más pequeño)
      drawCenteredText("has successfully completed the project:", height - 250, fontRegular, 16, lightGray);
      drawCenteredText(`"${project.title}"`, height - 275, fontItalic, 20, gray); // Título del proyecto en cursiva para diferenciarse.
      drawCenteredText("with outstanding dedication and skill.", height - 300, fontRegular, 16, lightGray); // Frase de cierre

      // 6. Línea Divisoria (Sutil, para separar la información principal de la firma/fecha)
      page.drawLine({
        start: { x: width * 0.2, y: 140 }, // 20% desde el borde izquierdo
        end: { x: width * 0.8, y: 140 },   // 20% desde el borde derecho
        thickness: 0.5,
        color: lightGray,
      });

      // 7. Firma (Centrada y bien espaciada)
      const embeddedSignature = await pdfDoc.embedPng(signatureBytes);
      const signatureScaledDims = embeddedSignature.scale(0.08); // Escala para que no sea muy grande
      page.drawImage(embeddedSignature, {
        x: (width - signatureScaledDims.width) / 2,
        y: 80, // Posición vertical
        width: signatureScaledDims.width,
        height: signatureScaledDims.height,
      });

      // Nombre del firmante y cargo (debajo de la firma)
      drawCenteredText("Rodrigo Campos", 60, fontBold, 12, gray);
      drawCenteredText("Director, Dexpert", 45, fontRegular, 10, lightGray); // Pequeño y discreto

      // 8. Fecha de Emisión (Esquina inferior derecha o alineado a la firma)
      page.drawText(`Issued on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, {
        x: width - 200, // Ajusta para alinear a la derecha
        y: 20,
        size: 10,
        font: fontRegular,
        color: lightGray,
      });


      const pdfBytes = await pdfDoc.save();
      const fileName = `certificate-${application.student.id}-${project.id}`; // Cambié Date.now() por project.id para consistencia

      // Upload to Cloudinary (mantengo la función que ya tenías)
      const url = await uploadPDFtoCloudinary(Buffer.from(pdfBytes), fileName);

      // Save to database
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
      message: "Project closed and certificates generated"
    });

  } catch (error: any) {
    console.error("Error generating or uploading certificate:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}