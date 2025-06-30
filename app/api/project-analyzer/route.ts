import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Función para validar que el archivo es un PDF subido por el usuario
function isValidUploadedPDF(file: unknown): file is File {
  return file instanceof Blob && (file as File).type === "application/pdf";
}

// Función para procesar un archivo PDF subido
async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const data = await pdfParse(buffer);
  return data.text;
}

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    const formData = await req.formData();
    const fileEntries = formData.getAll("files");

    if (!fileEntries || fileEntries.length === 0) {
      return NextResponse.json({ error: "No PDF files were uploaded." }, { status: 400 });
    }

    let combinedText = "";
    const MAX_TOTAL_LENGTH = 15000;
    let processedCount = 0;

    for (const entry of fileEntries) {
      if (!isValidUploadedPDF(entry)) continue;

      try {
        const file = entry as File;
        const text = await extractTextFromPDF(file);
        combinedText += `--- ${file.name} ---\n${text}\n\n`;
        processedCount++;

        if (combinedText.length >= MAX_TOTAL_LENGTH) {
          combinedText = combinedText.slice(0, MAX_TOTAL_LENGTH);
          break;
        }
      } catch (err) {
        console.error(`Error processing file:`, err);
        continue;
      }
    }

    if (processedCount === 0) {
      return NextResponse.json(
        { error: "Could not process any of the uploaded PDF files." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert project analyst. Analyze the following project information from PDF documents. Identify strengths, weaknesses, risks, and suggest improvements:\n\n${combinedText}`;

    const chat = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      max_tokens: 1500,
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      analysis: chat.choices[0]?.message?.content || "No analysis generated",
      processedFiles: processedCount,
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
