import {NextResponse} from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import {getDb, listFeedback} from '../../../lib/db';
import {isAuthorized} from '../../../lib/adminAuth';

function toLine(r){
  const parts=[`[${new Date(r.submitted_at).toISOString().slice(0,10)}] domain=${r.domain} ease=${r.ease} clarity=${r.clarity} usefulness=${r.usefulness} self_service=${r.self_service}`];
  if(r.ease_comment) parts.push(`ease_comment: ${r.ease_comment}`);
  if(r.clarity_comment) parts.push(`clarity_comment: ${r.clarity_comment}`);
  if(r.improvement) parts.push(`improvement: ${r.improvement}`);
  if(r.issue) parts.push(`issue: ${r.issue}`);
  return '- '+parts.join(' | ');
}

export async function POST(req){
  if(!isAuthorized(req)) return NextResponse.json({error:'Unauthorized'},{status:401});
  if(!process.env.ANTHROPIC_API_KEY) return NextResponse.json({error:'ANTHROPIC_API_KEY is not configured'},{status:500});
  try{
    const sql=await getDb();
    const rows=await listFeedback(sql);
    if(rows.length===0) return NextResponse.json({summary:'Chưa có phản hồi nào để tóm tắt.',count:0});

    const sample=rows.slice(0,300);
    const client=new Anthropic();
    const response=await client.messages.create({
      model:'claude-opus-5',
      max_tokens:2000,
      output_config:{effort:'medium'},
      system:'Bạn là trợ lý phân tích phản hồi người dùng nội bộ cho một KPI dashboard. Trả lời bằng tiếng Việt, súc tích, dùng bullet points, không lặp lại dữ liệu thô.',
      messages:[{role:'user',content:`Dưới đây là ${sample.length} phản hồi gần nhất (trên tổng số ${rows.length}) về CP KPI Dashboard. Hãy tóm tắt:\n1) Xu hướng điểm đánh giá theo 4 tiêu chí (ease, clarity, usefulness, self_service)\n2) Các vấn đề/lỗi lặp lại nổi bật\n3) Đề xuất cải thiện được nhắc đến nhiều nhất\n4) Nhận định tổng quan\n\n${sample.map(toLine).join('\n')}`}]
    });

    const text=response.content.find(b=>b.type==='text')?.text || '';
    return NextResponse.json({summary:text,count:rows.length});
  }catch(e){
    console.error(e);
    if(e instanceof Anthropic.AuthenticationError) return NextResponse.json({error:'Invalid ANTHROPIC_API_KEY'},{status:500});
    if(e instanceof Anthropic.RateLimitError) return NextResponse.json({error:'Anthropic API rate limited, try again shortly'},{status:429});
    if(e instanceof Anthropic.APIError) return NextResponse.json({error:`Anthropic API error: ${e.message}`},{status:502});
    return NextResponse.json({error:'Failed to generate summary'},{status:500});
  }
}
