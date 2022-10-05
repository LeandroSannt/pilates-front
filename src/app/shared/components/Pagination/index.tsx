import React from 'react'

interface PaginationProps{
  current_page:number
  first_page:number
  last_page:number
  changePage(value:string):void
}

const Pagination:React.FC<PaginationProps>= ({changePage,current_page,first_page,last_page}) =>{
  return(
    <div className='mt-5 flex w-full  justify-between'>
      <button disabled={current_page === first_page} onClick={() =>{changePage('previous')}} className="btn btn-outline  sm:text-base text-xs">Anterior</button>
      <span className='sm:text-base text-xs flex items-center justify-center text-white  rounded-full bg-secundary w-10 h-10'>{current_page}</span>
      <button disabled={current_page === last_page} onClick={() =>{changePage('next')}} className="btn btn-outline  sm:text-base text-xs">Proxima</button>
    </div>
  )
}
export default Pagination