import {NextResponse} from 'next/server';
import ExcelJS from 'exceljs';
import {getDb, listFeedback, FEEDBACK_COLUMNS} from '../../../lib/db';
import {isAuthorized} from '../../../lib/adminAuth';

export async function GET(req){
  if(!isAuthorized(req)) return NextResponse.json({error:'Unauthorized'},{status:401});
  const sql=await getDb();
  const rows=await listFeedback(sql);

  const wb=new ExcelJS.Workbook();
  const sheet=wb.addWorksheet('Feedback');
  sheet.columns=FEEDBACK_COLUMNS.map(c=>({header:c,key:c,width:c.includes('comment')||c==='improvement'||c==='issue'?40:18}));
  sheet.addRows(rows);
  sheet.getRow(1).font={bold:true};

  const buf=await wb.xlsx.writeBuffer();
  return new NextResponse(buf,{headers:{
    'content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'content-disposition':'attachment; filename="cp-kpi-feedback.xlsx"',
    'cache-control':'no-store'
  }});
}
