import React from 'react'
import { useQuery } from 'react-query'
import SyncLoader from 'react-spinners/SyncLoader'

import { api } from '../../../config/api'
import { FinancialProps } from '../../shared/interfaces/students'
import { downloadFile } from '../../shared/utils/downloadFile'
import { Container } from './styles'

const Reports:React.FC = () =>{

  const {data:financial,isLoading} = useQuery<FinancialProps>(['financial'], async () =>{
    const response = await api.get('/report/financial')  
  
    return response.data
  })

  const handleExport = async () =>{
    const response = await api.get('/report/financial-download',{
      responseType:'blob',
    })

    const blob = new Blob([response.data]);
    downloadFile(blob, 'teste' + '.pdf');

    return response.data

  }

  //  const downloadFile = async (response:any, filename/*: string*/ = 'download') => {
  //   const c = await response
  //   const blob = new Blob([c], { type: 'application/pdf' });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = `${filename}-${+new Date()}.pdf`;
  //   link.click();
  // };


  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('http://localhost:3333/report/financial-download').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'SamplePDF.pdf';
            alink.click();
        })
    })
}


if(isLoading){
  <div className='flex items-center justify-center mt-28'>
    <SyncLoader  color='#1fcab3'/>
  </div> 
}

  return(
    <Container>
      <h1 className='font-bold text-lg mb-5'>Relatorio financeiro</h1>
      <div className='md:flex-row flex-col flex justify-between'>

      <div className='flex flex-col  mb-5'>
        <span>Valor Total: <strong>{financial?.sum_value}</strong></span>
        <span>Valor a Descontar: <strong>{financial?.sum_percent_rate}</strong></span>
        <span>Valor a Receber:  <strong>{financial?.sum_amount_receivable}</strong></span>
      </div>

      <button onClick={handleExport} className="md:mb-0 mb-5 btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">Exportar relatorio</button>

      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plano</th>
              <th>Valor do Plano</th>
              <th>Comissão</th>
              <th>Receber</th>
            </tr>
          </thead>
          <tbody>

            {financial?.studentExpiration.map((financialProps) =>(
              <tr>
              <td>{financialProps.name}</td>
              <td>{financialProps.expiration_date} / {financialProps.plan.amount_installments}</td>
              <td>
                {
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(financialProps.plan.value.toFixed(2)))
                }
              </td>
              <td>
                {
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(financialProps.total_percent_rate.toFixed(2)))
                }
              </td>
              <td>
                {
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(financialProps.calc_amount_receivable.toFixed(2))) 
                }
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}
export default Reports