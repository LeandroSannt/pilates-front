export interface MetaProps{
  current_page:number
  first_page:number
  first_page_url:string
  last_page:number
  last_page_url:string
  next_page_url:string | null
  per_page :number
  previous_page_url :null
  total:number
}


export interface PlanProps{
  amount_installments:number 
  created_at:string 
  id:number 
  name_plan:string 
  updated_at:string 
  value:number 
  percent_rate:number
}


export interface StudentProps{
  birth_date:string
  created_at:string 
  current_month_plan:string 
  email:string 
  expiration_date:string 
  id:number 
  name:string 
  objective:string 
  plan: PlanProps
  plan_expiration_day:string 
  plan_id:number 
  registration:string 
  status:string 
  telephone:string 
  telephone_emergency:string 
  updated_at:string 
  date_start_plan:string
}

export interface StudentsPaginated{
  meta:MetaProps
  data:StudentProps[]
}

export interface GangPropsInterface{
  id:number
  time:string
  day:string
}

export interface StudentsAulasProps{
    id:number
    time:string
    day:string
    classe_id:number
    studentGang:Array<{
      id:number
      name:string
      status:string
    }>
  
}

export interface GangLakeProps{
  id:number
  gang_id:number
  student_id:number
  date:string
  observation:string
  created_at:string
  updated_at:string
  gang:GangPropsInterface
  student:{
    name:string
    telephone:string
    email:string
    id:number
  }
}

export interface GangLakePaginated{
  meta:MetaProps
  data:GangLakeProps[]
}

export interface GangProps{
  time:string
  day:string
}

export interface ExChangedProps{
  id:number
  date_exchanges:string
  date_lacks:string
  gang_id:number
  gang:GangProps
  student_id:number
  observation:string
  status:string
}

export interface ExChangedStudentProps{
  id:number
  registration:string
  name:string
  telephone:string
  total_exchanges:string
  exchange:ExChangedProps[]
  
}


export interface ExchangedPaginated{
  meta:MetaProps
  data:ExChangedStudentProps[]
}


export interface StudentExpirationProps{
  expiration_date:string
  calc_amount_receivable:number
  total_percent_rate:number
  name:string
  email:string
  telephone:string
  current_month_plan:number
  plan:PlanProps
}


export interface FinancialProps{
  sum_percent_rate:string
  sum_amount_receivable:string
  sum_value:string
  studentExpiration:StudentExpirationProps[]
}


export interface IClasseGangs{
  id:number
  name:string
  status:string
  gangs:StudentsAulasProps[]
}
