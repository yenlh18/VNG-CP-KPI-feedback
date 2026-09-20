import {NextResponse} from 'next/server';
import {getDb, listFeedback, FEEDBACK_COLUMNS} from '../../lib/db';
import {isAuthorized} from '../../lib/adminAuth';

const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';

export async function GET(req){
  if(!isAuthorized(req)) return NextResponse.json({error:'Unauthorized'},{status:401});
  const sql=await getDb();
  const rows=await listFeedback(sql);
  const csv='﻿'+[FEEDBACK_COLUMNS.join(','),...rows.map(r=>FEEDBACK_COLUMNS.map(c=>esc(r[c])).join(','))].join('\n');
  return new NextResponse(csv,{headers:{'content-type':'text/csv; charset=utf-8','content-disposition':'attachment; filename="cp-kpi-feedback.csv"','cache-control':'no-store'}});
}
