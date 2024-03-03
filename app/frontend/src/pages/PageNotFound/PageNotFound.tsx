import { FaArrowRightFromBracket } from "react-icons/fa6"
import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="mx-auto w-40 text-right text-navy">
          <p className="font-medium">404</p>
          <p>page not found</p>
          <div className='flex flex-row items-center gap-x-2 mt-6 text-sm text-lilac justify-end'>
            <FaArrowRightFromBracket className="transform rotate-180" size={10}/>
            <Link to={'/'}>
              <p className='underline'>Go back to dashboard</p>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default PageNotFound