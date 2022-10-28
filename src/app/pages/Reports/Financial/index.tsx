import moment from 'moment';
import pdfMakee from 'pdfmake/build/pdfmake';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { FinancialProps } from '../../../shared/interfaces/students';

import 'moment/locale/pt-br';

const financialReport = (data:FinancialProps) =>{
  pdfMakee.vfs = pdfMake.vfs

  const body:any = []

  data.studentExpiration.map((student) =>{  
    const rows = new Array()
    rows.push(student.name)
    rows.push(`${student.current_month_plan} - ${student.plan.amount_installments}`)
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.plan.value.toFixed(2))))
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(Number(student.total_percent_rate).toFixed(2))) )
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.calc_amount_receivable.toFixed(2))) )

    body.push(rows)
  })

  const docDefinitions:TDocumentDefinitions ={
      content:[
        {
          columns:[
            // {image:'data:image/png;base64,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',width:100, alignment:"left",},
            {text:moment().format('DD/MM/YYYY'), alignment:"right",margin:[0,50,0,0]},
          ],
        },
        {text:`Valor a Total: ${data.sum_value}`,lineHeight:2},
        {text:`Valor a Descontar: ${data.sum_percent_rate}`,lineHeight:2},
        {text:`Valor a Receber : ${data.sum_amount_receivable} \n\n`,lineHeight:2},
        {
          layout:'noBorders',
          table:{

            widths:[ '*', 100, 'auto', '*', '*' ],
            heights: function(){
              return 20
            },
          body:[
            [{text:'Nome',style:'columnsTitle'},{text:'Plano',style:'columnsTitle'},{text:'Valor do Plano',style:'columnsTitle'}, {text:'Comissão',style:'columnsTitle'}, {text:'Receber',style:'columnsTitle'},],
            ...body
          ]
        }
      }
     ],

     styles:{
      header:{
        fontSize:18,
        bold:true
      },
      columnsTitle:{
        bold:true
      }
     }
  }

  pdfMakee.createPdf(docDefinitions).download(`Anivesariantes do mes`)

}
export { financialReport };

