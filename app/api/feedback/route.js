import {NextResponse} from 'next/server';
import {getDb} from '../../lib/db';

export async function POST(req){
  try{
    const b=await req.json();
    if(!b.domain || ![1,2,3,4,5].includes(b.ease) || ![1,2,3,4,5].includes(b.clarity) || ![1,2,3,4,5].includes(b.usefulness) || !b.selfService){
      return NextResponse.json({ok:false,error:'Missing required fields'},{status:400});
    }
    const id=crypto.randomUUID();
    const sql=await getDb();
    await sql`INSERT INTO cp_kpi_feedback (id,domain,ease,ease_comment,clarity,clarity_comment,usefulness,self_service,improvement,issue)
      VALUES (${id},${b.domain},${b.ease},${b.easeComment||null},${b.clarity},${b.clarityComment||null},${b.usefulness},${b.selfService},${b.improvement||null},${b.issue||null})`;
    return NextResponse.json({ok:true,id});
  }catch(e){
    console.error(e);
    return NextResponse.json({ok:false},{status:500});
  }
}
