'use client';
import {useState} from 'react';

const copy={
  vi:{
    language:'Ngôn ngữ', title:'Phản hồi về CP KPI Dashboard',
    intro1:<>Cảm ơn Anh/Chị đã dành thời gian trải nghiệm <b>CP KPI Dashboard</b>.</>,
    intro2:<>Rất mong Anh/Chị chia sẻ với team một vài cảm nhận sau khi sử dụng. Những góp ý của Anh/Chị sẽ giúp team hiểu <b>điểm nào đang hoạt động tốt và điểm nào cần cải thiện</b>, để Dashboard ngày càng <b>dễ dùng, rõ ràng và hữu ích hơn</b> cho các kỳ cập nhật KPI tiếp theo.</>,
    time:'Biểu mẫu chỉ mất khoảng 2 phút để hoàn thành :)', thanks:'Cảm ơn Anh/Chị đã chia sẻ!', domain:'DOMAIN CỦA ANH/CHỊ', domainPlaceholder:'Chọn Domain',
    dims:[
      {name:'Dễ sử dụng', en:'Ease of Use', q:'Việc cập nhật kết quả KPI trên Dashboard có thuận tiện và dễ thực hiện không?', labels:['Rất dễ','Dễ','Bình thường','Khó','Rất khó'], follow:'Có bước nào Anh/Chị thấy chưa thuận tiện hoặc mất nhiều thời gian hơn mong đợi không?'},
      {name:'Rõ ràng & dễ hiểu', en:'Clarity & Understandability', q:'Anh/Chị có dễ dàng biết mình cần cập nhật thông tin gì và hiểu cách kết quả KPI được tính không?', labels:['Rất rõ','Rõ','Bình thường','Chưa rõ','Rất khó hiểu'], follow:'Có nội dung nào Anh/Chị thấy chưa rõ hoặc cần giải thích thêm không?'},
      {name:'Tính hữu ích', en:'Usefulness', q:'Dashboard có giúp Anh/Chị nhanh chóng nắm được tiến độ và kết quả KPI của phòng ban không?', labels:['Rất tốt','Tốt','Bình thường','Chưa tốt','Không tốt']},
      {name:'Khả năng tự sử dụng', en:'Self-Service', q:'Ở kỳ cập nhật KPI tiếp theo, Anh/Chị có thể tự sử dụng Dashboard mà không cần nhiều hỗ trợ không?', choices:['Có thể tự sử dụng','Có thể, nhưng vẫn cần hỗ trợ một chút','Vẫn cần được hỗ trợ']}
    ],
    more:'Chia sẻ thêm', optional:'Không bắt buộc', morePlaceholder:'Chia sẻ thêm...', improveHead:'NẾU CHỈ CẢI THIỆN MỘT ĐIỀU...', improveQ:'Nếu chỉ chọn một điều để Dashboard tốt hơn trong kỳ cập nhật tiếp theo, Anh/Chị muốn team cải thiện điều gì?', improvePlaceholder:'Chia sẻ ý kiến của Anh/Chị...', issueQ:'Trong quá trình sử dụng, Anh/Chị có gặp vấn đề nào cần team kiểm tra không?', issueHelp:'Ví dụ: lỗi thao tác, kết quả/điểm KPI hiển thị chưa như mong đợi, hoặc chức năng hoạt động chưa đúng.', issuePlaceholder:'Mô tả vấn đề Anh/Chị gặp phải...', submit:'Gửi phản hồi →', sending:'Đang gửi...', required:'Anh/Chị vui lòng hoàn thành các câu hỏi chính.', error:'Chưa thể gửi phản hồi. Vui lòng thử lại.', footer:'Phản hồi của Anh/Chị sẽ được S&I và DTO sử dụng để cải thiện Dashboard.', success:'Cảm ơn Anh/Chị đã chia sẻ!', successBody:'Phản hồi của Anh/Chị đã được ghi nhận và sẽ giúp team tiếp tục cải thiện CP KPI Dashboard cho các kỳ cập nhật tiếp theo.'
  },
  en:{
    language:'Language', title:'CP KPI Dashboard Feedback',
    intro1:<>Thank you for taking the time to experience the <b>CP KPI Dashboard</b>.</>,
    intro2:<>We’d appreciate your feedback on your experience using the Dashboard. Your input will help the team understand <b>what is working well and what can be improved</b>, so we can make the Dashboard <b>easier to use, clearer, and more useful</b> for future KPI update cycles.</>,
    time:'This form only takes about 2 minutes to complete :)', thanks:'Thank you for sharing your feedback!', domain:'YOUR DOMAIN', domainPlaceholder:'Select Domain',
    dims:[
      {name:'Ease of Use', q:'How easy and convenient was it to update your KPI results on the Dashboard?', labels:['Very easy','Easy','Neutral','Difficult','Very difficult'], follow:'Was there any step that felt inconvenient or took more time than expected?'},
      {name:'Clarity & Understandability', q:'Was it clear what information you needed to update and how your KPI results were calculated?', labels:['Very clear','Clear','Neutral','Unclear','Very unclear'], follow:'Was there anything that was unclear or that you would like further explanation on?'},
      {name:'Usefulness', q:'Does the Dashboard help you quickly understand your department’s KPI progress and results?', labels:['Very well','Well','Neutral','Not very well','Not at all']},
      {name:'Self-Service', q:'For the next KPI update cycle, would you be able to use the Dashboard independently without much support?', choices:['Yes, I can use it independently','Yes, but I may still need some support','I would still need support']}
    ],
    more:'Share more', optional:'Optional', morePlaceholder:'Share more...', improveHead:'IF YOU COULD IMPROVE JUST ONE THING...', improveQ:'If you could choose one thing to make the Dashboard better for the next KPI update cycle, what would you like the team to improve?', improvePlaceholder:'Share your suggestion...', issueQ:'Did you encounter any issues while using the Dashboard that the team should look into?', issueHelp:'For example: difficulty completing an action, KPI results/scores not displaying as expected, or a feature not working as intended.', issuePlaceholder:'Describe the issue you encountered...', submit:'Submit Feedback →', sending:'Submitting...', required:'Please complete all required questions.', error:'Your feedback could not be submitted. Please try again.', footer:'Your feedback will be used by S&I and DTO to improve the Dashboard.', success:'Thank you for sharing your feedback!', successBody:'Your feedback has been recorded and will help the team continue improving the CP KPI Dashboard for future KPI update cycles.'
  }
};
const faces=['◡','⌣','—','⌢','︵'];
function Scale({labels,value,onChange}){return <div className="scale">{labels.map((x,i)=><button type="button" key={x} className={'rate '+(value===i+1?'selected':'')} onClick={()=>onChange(i+1)} aria-pressed={value===i+1}><span className="face">{faces[i]}</span><span>{x}</span></button>)}</div>}
export default function Page(){
  const [lang,setLang]=useState('vi'); const t=copy[lang];
  const [f,setF]=useState({}); const [sent,setSent]=useState(false); const [sending,setSending]=useState(false); const set=(k,v)=>setF(x=>({...x,[k]:v}));
  async function submit(e){e.preventDefault(); if(!f.domain||!f.ease||!f.clarity||!f.usefulness||!f.selfService){alert(t.required);return} setSending(true); try{const r=await fetch('/api/feedback',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...f,language:lang})}); if(r.ok)setSent(true);else alert(t.error)}finally{setSending(false)}}
  if(sent)return <main><div className="card thanks"><div className="language-switch"><button className={lang==='vi'?'active':''} onClick={()=>setLang('vi')}>VI</button><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button></div><div className="check">✓</div><h1>{t.success}</h1><p>{t.successBody}</p><small>S&I × DTO</small></div></main>;
  return <main><form className="card" onSubmit={submit}>
    <div className="language-switch" aria-label={t.language}><button type="button" className={lang==='vi'?'active':''} onClick={()=>setLang('vi')}>VI</button><button type="button" className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button></div>
    <header><div className="eyebrow">CP KPI DASHBOARD</div><h1>{t.title}</h1><p>{t.intro1}</p><p>{t.intro2}</p><div className="meta"><span>{t.time}</span><span>S&I × DTO</span></div><p className="thank-note">{t.thanks}</p></header>
    <section><label className="micro">{t.domain}</label><select value={f.domain||''} onChange={e=>set('domain',e.target.value)} required><option value="">{t.domainPlaceholder}</option>{['HR','Finance','DTO','TSE','CBC','LG&C','Procurement','Khác / Other'].map(x=><option key={x}>{x}</option>)}</select></section>
    {t.dims.slice(0,3).map((d,i)=>{const keys=['ease','clarity','usefulness']; const k=keys[i]; return <section key={k}><div className="num">0{i+1}</div><div className="dimension">{d.name} {lang==='vi'&&<span>({d.en})</span>}</div><h2>{d.q}</h2><Scale labels={d.labels} value={f[k]} onChange={v=>set(k,v)}/>{d.follow&&<details><summary>{t.more} <span>{t.optional}</span></summary><p className="followup">{d.follow}</p><textarea placeholder={t.morePlaceholder} value={f[k+'Comment']||''} onChange={e=>set(k+'Comment',e.target.value)}/></details>}</section>})}
    <section><div className="num">04</div><div className="dimension">{t.dims[3].name} {lang==='vi'&&<span>({t.dims[3].en})</span>}</div><h2>{t.dims[3].q}</h2><div className="choices">{t.dims[3].choices.map((x,i)=><button type="button" key={x} className={f.selfService===i+1?'selected':''} onClick={()=>set('selfService',i+1)} aria-pressed={f.selfService===i+1}>{x}</button>)}</div></section>
    <section className="soft"><div className="micro">{t.improveHead}</div><h2>{t.improveQ} <span className="optional">{t.optional}</span></h2><textarea placeholder={t.improvePlaceholder} value={f.improvement||''} onChange={e=>set('improvement',e.target.value)}/></section>
    <section className="issue"><button type="button" className="issueBtn" onClick={()=>set('showIssue',!f.showIssue)}>＋ {t.issueQ} <span>{t.optional}</span></button>{f.showIssue&&<div className="issueBody"><p>{t.issueHelp}</p><textarea placeholder={t.issuePlaceholder} value={f.issue||''} onChange={e=>set('issue',e.target.value)}/></div>}</section>
    <footer><button className="submit" disabled={sending}>{sending?t.sending:t.submit}</button><p>{t.footer}</p></footer>
  </form></main>
}
