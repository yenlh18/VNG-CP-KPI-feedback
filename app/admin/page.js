'use client';
import {useState, useEffect} from 'react';

export default function AdminPage(){
  const [token,setToken]=useState('');
  const [rows,setRows]=useState(null);
  const [loading,setLoading]=useState(false);
  const [summary,setSummary]=useState('');
  const [summarizing,setSummarizing]=useState(false);
  const [error,setError]=useState('');

  useEffect(()=>{ const saved=sessionStorage.getItem('adminToken'); if(saved) setToken(saved); },[]);

  function auth(){ return {authorization:'Bearer '+token}; }

  async function load(){
    setError(''); setLoading(true); setSummary('');
    try{
      const r=await fetch('/api/admin/responses',{headers:auth()});
      const d=await r.json();
      if(!r.ok) throw new Error(d.error||'Không tải được dữ liệu');
      sessionStorage.setItem('adminToken',token);
      setRows(d.rows);
    }catch(e){ setError(e.message); setRows(null); }
    finally{ setLoading(false); }
  }

  async function generateSummary(){
    setError(''); setSummarizing(true); setSummary('');
    try{
      const r=await fetch('/api/admin/summary',{method:'POST',headers:auth()});
      const d=await r.json();
      if(!r.ok) throw new Error(d.error||'Không tạo được tóm tắt');
      setSummary(d.summary);
    }catch(e){ setError(e.message); }
    finally{ setSummarizing(false); }
  }

  return <main style={{maxWidth:1000,margin:'0 auto',padding:'40px 18px'}}>
    <div className="card" style={{maxWidth:'100%'}}>
      <header>
        <div className="eyebrow">CP KPI DASHBOARD</div>
        <h1>Admin — Phản hồi người dùng</h1>
        <p>Nhập Admin Token để xem, xuất Excel, hoặc tạo tóm tắt AI cho các phản hồi.</p>
      </header>

      <section>
        <label className="micro">ADMIN TOKEN</label>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Nhập ADMIN_TOKEN"
            style={{flex:1,font:'inherit',border:'1px solid var(--bdr2)',borderRadius:9,padding:'11px 12px'}}/>
          <button className="submit" onClick={load} disabled={!token||loading}>{loading?'Đang tải...':'Xem phản hồi'}</button>
        </div>
        {error && <p style={{color:'var(--brand)',marginTop:10,fontSize:12.5}}>{error}</p>}
      </section>

      {rows && <section>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
          <h2 style={{margin:0}}>{rows.length} phản hồi</h2>
          <div style={{display:'flex',gap:8}}>
            <a className="submit" style={{textDecoration:'none',display:'inline-block'}} href={`/api/export?token=${encodeURIComponent(token)}`}>Xuất CSV</a>
            <a className="submit" style={{textDecoration:'none',display:'inline-block'}} href={`/api/export/xlsx?token=${encodeURIComponent(token)}`}>Xuất Excel</a>
            <button className="submit" onClick={generateSummary} disabled={summarizing}>{summarizing?'Đang tóm tắt...':'Tạo tóm tắt AI'}</button>
          </div>
        </div>

        {summary && <div className="soft" style={{marginTop:18,padding:16,borderRadius:10,whiteSpace:'pre-wrap',fontSize:13,lineHeight:1.6}}>{summary}</div>}

        <div style={{overflowX:'auto',marginTop:18}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12.5}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'1px solid var(--bdr)'}}>
                {['Thời gian','Domain','Ease','Clarity','Usefulness','Self-service','Cải thiện','Vấn đề'].map(h=>
                  <th key={h} style={{padding:'8px 10px',color:'var(--ink3)',fontWeight:600}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id} style={{borderBottom:'1px solid var(--bdr)'}}>
                  <td style={{padding:'8px 10px',whiteSpace:'nowrap'}}>{new Date(r.submitted_at).toLocaleString('vi-VN')}</td>
                  <td style={{padding:'8px 10px'}}>{r.domain}</td>
                  <td style={{padding:'8px 10px'}}>{r.ease}</td>
                  <td style={{padding:'8px 10px'}}>{r.clarity}</td>
                  <td style={{padding:'8px 10px'}}>{r.usefulness}</td>
                  <td style={{padding:'8px 10px'}}>{r.self_service}</td>
                  <td style={{padding:'8px 10px',maxWidth:220}}>{r.improvement}</td>
                  <td style={{padding:'8px 10px',maxWidth:220}}>{r.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>}
    </div>
  </main>;
}
