
import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'


const getPDFJS = async () => {
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = 
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
  return pdfjs
}

export const dynamic = 'force-dynamic' 

export async function POST(req: Request) {
  try {
    
    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Debes subir un archivo PDF válido' },
        { status: 400 }
      )
    }

    
    const pdfjs = await getPDFJS()
    const arrayBuffer = await file.arrayBuffer()
    
    const pdf = await pdfjs.getDocument(arrayBuffer).promise
    let fullText = ''

    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n\n'
    }

    if (!fullText.trim()) {
      return NextResponse.json(
        { error: 'No se pudo extraer texto del PDF. ¿Está escaneado como imagen?' },
        { status: 400 }
      )
    }

   
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const prompt = `**Análisis de Proyecto Digital**

**Contenido del PDF:**
${fullText.substring(0, 15000)}${fullText.length > 15000 ? '... [texto truncado]' : ''}

**Realiza un análisis estructurado con:**
1. 3 fortalezas clave
2. 3 áreas de mejora
3. 3 recomendaciones concretas
4. Puntuación general (1-10)

Formato de respuesta: Markdown con encabezados`

    const analysis = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en análisis de proyectos digitales. Proporciona feedback constructivo y profesional.'
        },
        { role: 'user', content: prompt }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.3,
      max_tokens: 3000
    })

    
    return NextResponse.json({
      analysis: analysis.choices[0]?.message?.content,
      metadata: {
        pages: pdf.numPages,
        textLength: fullText.length,
        modelUsed: 'mixtral-8x7b-32768'
      }
    })

  } catch (error: any) {
    console.error('Error en el análisis:', error)
    return NextResponse.json(
      {
        error: 'Error al procesar el PDF',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}