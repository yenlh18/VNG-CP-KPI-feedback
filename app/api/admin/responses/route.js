import {NextResponse} from 'next/server';
import {getDb, listFeedback} from '../../../lib/db';
import {isAuthorized} from '../../../lib/adminAuth';

export async function GET(req){
  if(!isAuthorized(req)) return NextResponse.json({error:'Unauthorized'},{status:401});
  const sql=await getDb();
  const rows=await listFeedback(sql);
  return NextResponse.json({rows});
}
