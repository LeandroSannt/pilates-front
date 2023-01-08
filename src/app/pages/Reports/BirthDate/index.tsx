import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { StudentProps } from '../../../shared/interfaces/students';

import 'moment/locale/pt-br';

const birthDate = (data:StudentProps[]) =>{
 (pdfMake as any).vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

  const body:any = []

  data.map((student) =>{  
    const rows = new Array()
    rows.push(student.name)
    rows.push(student.telephone)
    rows.push(`${student.day_birth} - ${student.month_birth}`)

    body.push(rows)
  })

  const docDefinitions:TDocumentDefinitions ={
    content:[
      {
        columns:[
          {text:'ANIVERSARIANTES DO MÊS', alignment:"center",margin:[0,0,0,50]},
        ],
      },
    
      {
        layout:'noBorders',
        table:{
          widths:[ '*', '*', '*' ],
          heights: function(){
            return 20
          },
        body:[
          [{text:'Nome',style:'columnsTitle'},{text:'Telefone',style:'columnsTitle'},{text:'Data de Anivesário',style:'columnsTitle'}],
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

  pdfMake.createPdf(docDefinitions).download(`relatorio-financeiro-${moment().format('MM/YYYY')}`)

}
export { birthDate };

