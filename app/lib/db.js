import {neon} from '@neondatabase/serverless';

export const FEEDBACK_COLUMNS=['id','submitted_at','domain','ease','ease_comment','clarity','clarity_comment','usefulness','self_service','improvement','issue'];

export async function getDb(){
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

export async function listFeedback(sql){
  return sql`SELECT id,submitted_at,domain,ease,ease_comment,clarity,clarity_comment,usefulness,self_service,improvement,issue FROM cp_kpi_feedback ORDER BY submitted_at DESC`;
}
