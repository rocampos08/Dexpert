'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SimuladorPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleUpload = async () => {
    setError('')
    if (!pdfFile) {
      setError('Por favor selecciona un archivo PDF.')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const formData = new FormData()
      formData.append('file', pdfFile)

      const res = await fetch('/api/Project-analizer', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Error en la API: ' + res.statusText)
      }

      const data = await res.json()
      setResult(data.analysis)
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Simulador de Proyectos</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        className="block w-full cursor-pointer border border-gray-300 rounded-md p-2"
      />

      <Button onClick={handleUpload} disabled={loading || !pdfFile}>
        {loading ? 'Analizando...' : 'Analizar Proyecto'}
      </Button>

      {error && (
        <div className="text-red-600 font-semibold">{error}</div>
      )}

      {result && (
        <Card>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
