import moment from 'moment';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { FinancialProps } from '../../../shared/interfaces/students';

import 'moment/locale/pt-br';

const financialReport = (data:FinancialProps) =>{
 (pdfMake as any).vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;


  const body:any = []

  data.studentExpiration.map((student) =>{  
    const rows = new Array()
    rows.push(student.name)
    rows.push(`${student.expiration_date} - ${student.plan.amount_installments}`)
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.plan.value.toFixed(2))))
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(Number(student.total_percent_rate).toFixed(2))) )
    rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.calc_amount_receivable.toFixed(2))) )

    body.push(rows)
  })

  const docDefinitions:TDocumentDefinitions ={
      content:[
        {
          columns:[
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

  pdfMake.createPdf(docDefinitions).download(`Anivesariantes do mes`)

}
export { financialReport };

