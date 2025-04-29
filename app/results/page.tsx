'use client'
import { Suspense } from 'react'
import ResultsContent from '../components/Results/ResultsContent'

export default function Results() {
 return (
  <main className="md:h-full md:bg-[#e7e7e7]">
   <Suspense fallback={<p>Cargando Resultados...</p>}>
    <ResultsContent />
   </Suspense>
  </main>
 )
}
