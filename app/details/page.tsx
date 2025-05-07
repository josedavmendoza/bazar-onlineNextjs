'use client'
import { useRouter } from 'next/navigation'
import DetailsHeader from '../components/Details/DetailsHeader'
import DetailsContainer from '../components/Details/DetailsContainer'
import Footer from '../components/home/Footer'
import { Suspense } from 'react'

export default function Details() {
 const router = useRouter()

 const handleSearch = (formData: FormData) => {
  const term = formData.get('term')
  router.push(`/results?search=${term}`)
 }

 return (
  <main className="md:h-full md:bg-[#e7e7e7]">
   <DetailsHeader onSearch={handleSearch} />
   <Suspense>
    <DetailsCLientWrapper />
   </Suspense>
   <Footer />
  </main>
 )
}

function DetailsCLientWrapper() {
 return <DetailsContainer />
}
