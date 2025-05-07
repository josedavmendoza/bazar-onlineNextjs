import { useRouter } from 'next/navigation'
import BazarIcon from '../home/BazarIcon'

interface DetailsHeaderProps {
 onSearch: (formData: FormData) => void
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ onSearch }) => {
 const router = useRouter()
 return (
  <nav className="flex md:h-[100px] md:justify-center md:bg-[#98c1d9] ">
   <div className="flex h-[85px] w-full items-center justify-evenly md:my-auto md:flex  md:h-[80px] md:w-[1070px] md:items-start md:justify-normal">
    <div className="md:block md:h-[80px] md:w-[120px]">
     <a href="/">
      <BazarIcon
       className="md:mx-auto md:mt-[8px] md:h-[50px] md:w-[50px]"
       height={80}
       width={65}
      />
     </a>
     <p className="hidden  md:block md:h-[24px] md:w-[120px] md:text-nowrap md:text-center md:text-[14.85px] md:font-extrabold md:leading-[24px]">
      Pocket Market
     </p>
    </div>
    <form
     action={onSearch}
     className="md:ml-[41px] md:inline-block md:h-[55px]"
    >
     <div className="flex h-[40px] w-[228px] items-center justify-evenly rounded bg-gray-200 shadow md:mb-[15px] md:inline-flex md:h-[40px]  md:w-[506.89px] md:justify-normal md:bg-white md:placeholder:font-light">
      <input
       className="w-[186px] bg-gray-200 text-base outline-none placeholder:text-[12px] placeholder:font-light md:ml-[15px] md:w-[450px] md:bg-white md:placeholder:text-[14.50px] md:placeholder:font-light md:placeholder:text-slate-500"
       type="text"
       name="term"
       placeholder="Search products, brands and more..."
      />
      <button type="submit">
       <svg
        className="md:ml-[5px] md:h-[25] md:w-[25]"
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={20}
        fill="none"
        viewBox="0 0 24 24"
       >
        <g stroke="#333" strokeWidth={1.8}>
         <path d="M19.96 11.48a8.45 8.45 0 0 1-2.458 5.971 8.438 8.438 0 0 1-6.022 2.51 8.48 8.48 0 1 1 8.48-8.48Z" />
         <path strokeLinecap="round" d="m18.155 18.155 3.732 3.732" />
        </g>
       </svg>
      </button>
     </div>
    </form>
   </div>
  </nav>
 )
}

export default DetailsHeader
