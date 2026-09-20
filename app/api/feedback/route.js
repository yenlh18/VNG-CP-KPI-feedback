import {NextResponse} from 'next/server';
import {neon} from '@neondatabase/serverless';

async function db(){
  if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  const sql=neon(process.env.DATABASE_URL);
  await sql`CREATE TABLE IF NOT EXISTS cp_kpi_feedback (
    id UUID PRIMARY KEY,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    domain TEXT NOT NULL,
    ease SMALLINT NOT NULL,
    ease_comment TEXT,
    clarity SMALLINT NOT NULL,
    clarity_comment TEXT,
    usefulness SMALLINT NOT NULL,
    self_service TEXT NOT NULL,
    improvement TEXT,
    issue TEXT
  )`;
  return sql;
}

export async function POST(req){
  try{
    const b=await req.json();
    if(!b.domain || ![1,2,3,4,5].includes(b.ease) || ![1,2,3,4,5].includes(b.clarity) || ![1,2,3,4,5].includes(b.usefulness) || !b.selfService){
      return NextResponse.json({ok:false,error:'Missing required fields'},{status:400});
    }
    const id=crypto.randomUUID();
    const sql=await db();
    await sql`INSERT INTO cp_kpi_feedback (id,domain,ease,ease_comment,clarity,clarity_comment,usefulness,self_service,improvement,issue)
      VALUES (${id},${b.domain},${b.ease},${b.easeComment||null},${b.clarity},${b.clarityComment||null},${b.usefulness},${b.selfService},${b.improvement||null},${b.issue||null})`;
    return NextResponse.json({ok:true,id});
  }catch(e){
    console.error(e);
    return NextResponse.json({ok:false},{status:500});
  }
}
