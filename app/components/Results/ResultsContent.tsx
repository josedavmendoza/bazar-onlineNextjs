import BazarIcon from '../BazarIcon'
import { useRouter, useSearchParams } from 'next/navigation'
import Footer from '../Footer'
import ResultsContainer from '../Results/ResultsContainer'
import SearchBarResults from '../Results/SearchBarResults'

// Results component function
export default function ResultsContent() {
 const searchParams = useSearchParams()
 const param = searchParams.get('search')
 const router = useRouter()

 const handleSearch = (formData: FormData) => {
  const term = formData.get('term')
  router.push(`/results?search=${term}`)
 }

 return (
  <>
   <nav className="flex md:h-[100px] md:justify-center md:bg-[#98c1d9]">
    <div className="flex h-[85px] w-full items-center justify-evenly md:my-auto md:flex md:h-[80px] md:w-[1070px] md:items-start md:justify-normal">
     <div className="md:block md:h-[80px] md:w-[120px]">
      <a href="/">
       <BazarIcon
        className="md:mx-auto md:mt-[8px] md:h-[50px] md:w-[50px]"
        height={80}
        width={65}
       />
      </a>
      <p className="hidden md:block md:h-[24px] md:w-[120px] md:text-nowrap md:text-center md:text-[14.85px] md:font-extrabold md:leading-[24px]">
       Pocket Market
      </p>
     </div>
     <SearchBarResults searchTerm={param || ''} onSearch={handleSearch} />
    </div>
   </nav>
   <ResultsContainer initialSearchTerm={param} />
   <Footer />
  </>
 )
}
