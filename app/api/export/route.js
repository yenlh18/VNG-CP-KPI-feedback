import {NextResponse} from 'next/server';
import {neon} from '@neondatabase/serverless';

const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';

export async function GET(req){
  const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'') || new URL(req.url).searchParams.get('token');
  if(!process.env.ADMIN_TOKEN || token!==process.env.ADMIN_TOKEN) return NextResponse.json({error:'Unauthorized'},{status:401});
  if(!process.env.DATABASE_URL) return NextResponse.json({error:'DATABASE_URL is not configured'},{status:500});
  const sql=neon(process.env.DATABASE_URL);
  const rows=await sql`SELECT id,submitted_at,domain,ease,ease_comment,clarity,clarity_comment,usefulness,self_service,improvement,issue FROM cp_kpi_feedback ORDER BY submitted_at DESC`;
  const cols=['id','submitted_at','domain','ease','ease_comment','clarity','clarity_comment','usefulness','self_service','improvement','issue'];
  const csv='\uFEFF'+[cols.join(','),...rows.map(r=>cols.map(c=>esc(r[c])).join(','))].join('\n');
  return new NextResponse(csv,{headers:{'content-type':'text/csv; charset=utf-8','content-disposition':'attachment; filename="cp-kpi-feedback.csv"','cache-control':'no-store'}});
}
