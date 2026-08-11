import React, { useEffect, useRef, useState } from "react";
import {
  Upload, CheckCircle2, Sparkles, Loader2, ChevronRight,
  AlertTriangle, RotateCcw, ShieldCheck, Target
} from "lucide-react";
import mammoth from "mammoth";

const STAGES = ["Sourced", "Screened", "Shortlisted"];
const C = {
  navy: "#1B2A4A", teal: "#0E9E8E", coral: "#C7623F",
  cream: "#F3EFE6", paper: "#FFFDF8", muted: "#1B2A4A99",
  border: "#1B2A4A22", danger: "#B84A4A"
};

export default function App() {
  const [stage, setStage] = useState(0);
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [fileName, setFileName] = useState("");
  const [parsing, setParsing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { loadPdfReader(); }, []);

  async function loadPdfReader() {
    if (window.pdfjsLib || document.querySelector('script[data-pdfjs="amigoxcel"]')) return;
    const script = document.createElement("script");
    script.dataset.pdfjs = "amigoxcel";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
    };
    document.body.appendChild(script);
  }

  const clean = (text) => String(text || "")
    .replace(/\u0000/g, "").replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

  async function waitForPdf() {
    if (window.pdfjsLib) return;
    await new Promise((resolve, reject) => {
      const started = Date.now();
      const timer = setInterval(() => {
        if (window.pdfjsLib) { clearInterval(timer); resolve(); }
        else if (Date.now() - started > 10000) {
          clearInterval(timer);
          reject(new Error("PDF reader could not load. Please paste your resume text."));
        }
      }, 100);
    });
  }

  async function handleFile(file) {
    if (!file) return;
    setError(""); setFileName(file.name); setParsing(true);
    try {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "docx", "txt"].includes(ext)) throw new Error("Please upload a PDF, DOCX, or TXT file.");
      if (file.size > 8 * 1024 * 1024) throw new Error("Please upload a file smaller than 8 MB.");

      if (ext === "txt") setResumeText(clean(await file.text()));
      else if (ext === "docx") {
        const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        setResumeText(clean(result.value));
      } else {
        await waitForPdf();
        const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          pages.push(content.items.map(x => x.str).join(" "));
        }
        setResumeText(clean(pages.join("\n")));
      }
    } catch (e) {
      setResumeText("");
      setError(e.message || "Could not read the file.");
    } finally { setParsing(false); }
  }

  async function analyze() {
    if (resumeText.trim().length < 80 || jobText.trim().length < 80) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobText })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Analysis failed. Please try again.");
      if (!data?.result) throw new Error("The analysis returned an invalid result.");
      setResult(data.result); setStage(2);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  }

  function reset() {
    setStage(0); setResumeText(""); setJobText(""); setFileName("");
    setResult(null); setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const canResume = resumeText.trim().length >= 80;
  const canAnalyze = canResume && jobText.trim().length >= 80 && !loading;

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:C.cream,minHeight:"100vh",color:C.navy}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box} body{margin:0}.fraunces{font-family:Fraunces,serif}
        button,textarea{font-family:Inter,sans-serif}.btn{transition:.15s ease}
        .btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 5px 15px #1b2a4a1a}
        textarea:focus{outline:2px solid #0e9e8e40;border-color:#0E9E8E!important}
        @keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin 1s linear infinite}
        @media(max-width:650px){.main{padding-top:25px!important}.title{font-size:28px!important}}
      `}</style>

      <header style={{borderBottom:`1px solid ${C.border}`,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:C.navy,color:C.cream,display:"grid",placeItems:"center",fontWeight:800}}>X</div>
          <div><div className="fraunces" style={{fontSize:18,fontWeight:700}}>Amigo<span style={{color:C.teal}}>Xcel</span></div><div style={{fontSize:11,letterSpacing:".06em",textTransform:"uppercase",color:C.muted}}>Resume Tailor</div></div>
        </div>
        <div style={{display:"flex",gap:6,fontSize:12,alignItems:"center"}}>
          {STAGES.map((s,i)=><React.Fragment key={s}>
            <span style={{padding:"6px 12px",borderRadius:999,background:i===stage?C.navy:i<stage?`${C.teal}20`:"transparent",color:i===stage?C.cream:i<stage?C.teal:"#1B2A4A66",border:i===stage?"none":`1px solid ${C.border}`,fontWeight:600}}>{s}</span>
            {i<2&&<ChevronRight size={14} color="#1B2A4A44"/>}
          </React.Fragment>)}
        </div>
      </header>

      <main className="main" style={{maxWidth:820,margin:"0 auto",padding:"45px 20px 80px"}}>
        {stage===0&&<ResumeStage {...{resumeText,setResumeText,fileName,parsing,error,fileInputRef,handleFile,canResume}} onContinue={()=>{setError("");setStage(1)}}/>}
        {stage===1&&<JobStage {...{jobText,setJobText,error,loading,canAnalyze}} onBack={()=>{setError("");setStage(0)}} onAnalyze={analyze}/>}
        {stage===2&&result&&<Results result={result} onTryAnother={()=>{setResult(null);setError("");setStage(1)}} onReset={reset}/>}
      </main>

      <footer style={{textAlign:"center",fontSize:12,color:"#1B2A4A66",padding:"0 20px 30px"}}>
        <div style={{marginBottom:8}}><ShieldCheck size={14} style={{verticalAlign:"middle"}}/> Your resume is analyzed securely through Amigoxcel.</div>
        Built by Amigoxcel · fast-forward your job search ⏩
      </footer>
    </div>
  );
}

function ResumeStage({resumeText,setResumeText,fileName,parsing,error,fileInputRef,handleFile,canResume,onContinue}) {
  return <section>
    <h1 className="fraunces title" style={{fontSize:34,fontWeight:600,margin:"0 0 8px"}}>Get your resume shortlisted, not screened out.</h1>
    <p style={{color:C.muted,margin:"0 0 32px",fontSize:15,lineHeight:1.6}}>Upload your resume or paste it in. Amigoxcel compares your real experience against a specific job and identifies exactly what to improve.</p>
    <div onClick={()=>fileInputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files?.[0])}} style={{border:"2px dashed #1B2A4A33",borderRadius:16,padding:"36px 24px",textAlign:"center",cursor:"pointer",background:C.paper}}>
      <input ref={fileInputRef} type="file" accept=".txt,.docx,.pdf" style={{display:"none"}} onChange={e=>handleFile(e.target.files?.[0])}/>
      <Upload size={30} color={C.coral} style={{marginBottom:10}}/>
      <div style={{fontWeight:700,marginBottom:5}}>{parsing?"Reading your resume...":fileName||"Click to upload or drop your resume"}</div>
      <div style={{fontSize:12,color:"#1B2A4A80"}}>PDF, DOCX or TXT · maximum 8 MB</div>
    </div>
    <Divider text="OR PASTE YOUR RESUME TEXT"/>
    <textarea value={resumeText} onChange={e=>setResumeText(e.target.value)} placeholder="Paste the complete text of your resume here..." rows={12} style={TA}/>
    <Counter text={resumeText}/>
    {error&&<ErrorBox message={error}/>}
    <button className="btn" disabled={!canResume} onClick={onContinue} style={{...primary(C.navy),marginTop:20,width:"100%"}}>Continue to job details</button>
  </section>
}

function JobStage({jobText,setJobText,error,loading,canAnalyze,onBack,onAnalyze}) {
  return <section>
    <h1 className="fraunces title" style={{fontSize:34,fontWeight:600,margin:"0 0 8px"}}>What role are you targeting?</h1>
    <p style={{color:C.muted,margin:"0 0 24px",fontSize:15,lineHeight:1.6}}>Paste the complete job description. We'll compare the role's requirements against the candidate's actual resume.</p>
    <div style={{display:"flex",gap:10,padding:14,borderRadius:12,background:`${C.teal}10`,marginBottom:14,fontSize:13}}><Target size={17} color={C.teal}/><div><strong>Accuracy first.</strong> Missing skills will not be added to the candidate's experience.</div></div>
    <textarea value={jobText} onChange={e=>setJobText(e.target.value)} placeholder="Paste the complete job description here..." rows={16} style={TA}/>
    <Counter text={jobText}/>
    {error&&<ErrorBox message={error}/>}
    <div style={{display:"flex",gap:10,marginTop:20}}>
      <button className="btn" onClick={onBack} disabled={loading} style={secondary}>Back</button>
      <button className="btn" disabled={!canAnalyze} onClick={onAnalyze} style={{...primary(C.coral),flex:1}}>
        {loading?<><Loader2 size={18} className="spin"/>Analyzing accurately...</>:<><Sparkles size={17}/>Analyze & tailor</>}
      </button>
    </div>
  </section>
}

function Results({result,onTryAnother,onReset}) {
  const score=Math.max(0,Math.min(100,Number(result.matchScore||0)));
  return <section>
    <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:30,flexWrap:"wrap"}}>
      <Gauge score={score}/>
      <div><div style={{fontSize:12,letterSpacing:".06em",textTransform:"uppercase",color:C.muted,fontWeight:700}}>Match verdict</div>
      <div className="fraunces" style={{fontSize:27,fontWeight:600,marginTop:3}}>{result.verdict}</div>
      <div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:6,background:`${C.teal}15`,color:C.teal,padding:"6px 10px",borderRadius:999,fontSize:12,fontWeight:700}}><CheckCircle2 size={14}/>{result.recommendation}</div></div>
    </div>
    <Section title="Score breakdown"><ScoreBreakdown breakdown={result.scoreBreakdown}/></Section>
    <Section title="Role requirements"><Requirements items={result.requirements}/></Section>
    <Section title="Already working in your favor">{(result.strengths||[]).map((x,i)=><Row key={i} icon={<CheckCircle2 size={16} color={C.teal}/>} text={x}/>)}</Section>
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:260}}><Section title="Keywords already supported"><Tags tags={result.matchedKeywords} color={C.teal} bg={`${C.teal}15`}/></Section></div>
      <div style={{flex:1,minWidth:260}}><Section title="Missing or unverified keywords"><Tags tags={result.missingKeywords} color={C.coral} bg={`${C.coral}15`}/></Section></div>
    </div>
    <Section title="Important fixes before applying">{(result.fixes||[]).map((x,i)=><Row key={i} icon={<span style={{color:C.coral,fontWeight:800}}>{i+1}</span>} text={x}/>)}</Section>
    <Section title="Tailored professional summary"><div style={card}>{result.rewrittenSummary}</div></Section>
    <Section title="Rewritten bullet points"><div style={card}>{(result.rewrittenBullets||[]).map((x,i)=><Row key={i} icon={<ChevronRight size={16}/>} text={x}/>)}</div></Section>
    {result.caution&&<div style={{display:"flex",gap:10,background:"#C7623F10",border:"1px solid #C7623F25",borderRadius:12,padding:15,fontSize:13,lineHeight:1.5,marginBottom:25}}><AlertTriangle size={18} color={C.coral}/><div>{result.caution}</div></div>}
    <div style={{display:"flex",gap:10,marginTop:32}}><button className="btn" onClick={onTryAnother} style={secondary}>Try another role</button><button className="btn" onClick={onReset} style={{...primary(C.navy),flex:1}}><RotateCcw size={16}/>Start over</button></div>
  </section>
}

function Gauge({score}) {
  const r=34,circ=2*Math.PI*r,offset=circ-(score/100)*circ;
  const color=score>=75?C.teal:score>=50?C.coral:C.danger;
  return <div style={{position:"relative",width:100,height:100,flexShrink:0}}><svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r={r} fill="none" stroke="#1B2A4A15" strokeWidth="9"/><circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 50 50)"/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><span className="fraunces" style={{fontSize:24,fontWeight:700}}>{score}</span><span style={{fontSize:9,color:C.muted,textTransform:"uppercase"}}>match</span></div></div>
}

function ScoreBreakdown({breakdown}) {
  if(!breakdown)return null;
  const rows=[["Technical skills",breakdown.skills,35],["Relevant experience",breakdown.experience,25],["Qualifications",breakdown.qualifications,20],["Responsibilities",breakdown.responsibilities,10],["Keywords",breakdown.keywords,10]];
  return <div style={card}>{rows.map(([label,value,max])=>{const p=Math.max(0,Math.min(100,(Number(value)/max)*100));return <div key={label} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}><span>{label}</span><strong>{value}/{max}</strong></div><div style={{height:7,background:"#1B2A4A10",borderRadius:999}}><div style={{height:"100%",width:`${p}%`,background:C.teal,borderRadius:999}}/></div></div>})}</div>
}

function Requirements({items=[]}) {
  return <div>{items.map((x,i)=>{const confirmed=x.status==="confirmed",partial=x.status==="partial";return <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i===items.length-1?"none":`1px solid ${C.border}`}}><div>{confirmed?<CheckCircle2 size={17} color={C.teal}/>:<AlertTriangle size={17} color={partial?C.coral:C.danger}/>}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{x.requirement}</div><div style={{marginTop:3,color:C.muted,fontSize:12,lineHeight:1.5}}>{x.evidence}</div></div><span style={{fontSize:10,textTransform:"uppercase",fontWeight:700,color:confirmed?C.teal:partial?C.coral:C.danger}}>{x.status}</span></div>})}</div>
}

function Section({title,children}) { return <section style={{marginBottom:28}}><div style={{fontSize:12,letterSpacing:".06em",textTransform:"uppercase",color:C.muted,fontWeight:700,marginBottom:11}}>{title}</div>{children}</section> }
function Row({icon,text}) { return <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,fontSize:14,lineHeight:1.55}}><div style={{marginTop:2,flexShrink:0,width:18,display:"flex",justifyContent:"center"}}>{icon}</div><div>{text}</div></div> }
function Tags({tags,color,bg}) { if(!tags?.length)return <div style={{fontSize:13,color:C.muted}}>None identified.</div>; return <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{tags.map((x,i)=><span key={i} style={{background:bg,color,padding:"6px 10px",borderRadius:999,fontSize:12,fontWeight:600}}>{x}</span>)}</div> }
function Divider({text}) { return <div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0",color:"#1B2A4A66",fontSize:11,fontWeight:600}}><div style={{flex:1,height:1,background:C.border}}/>{text}<div style={{flex:1,height:1,background:C.border}}/></div> }
function Counter({text}) { return <div style={{marginTop:7,fontSize:11,color:C.muted,textAlign:"right"}}>{text.length.toLocaleString()} characters</div> }
function ErrorBox({message}) { return <div role="alert" style={{display:"flex",gap:9,alignItems:"flex-start",background:"#B84A4A10",border:"1px solid #B84A4A25",color:C.danger,borderRadius:10,padding:12,marginTop:12,fontSize:13,lineHeight:1.5}}><AlertTriangle size={16}/><span>{message}</span></div> }

const TA={width:"100%",padding:16,borderRadius:12,border:`1px solid ${C.border}`,background:C.paper,fontSize:14,resize:"vertical",color:C.navy,lineHeight:1.6};
const card={background:C.paper,border:`1px solid ${C.border}`,borderRadius:12,padding:17,fontSize:14,lineHeight:1.7};
const secondary={padding:"14px 20px",borderRadius:12,border:"1px solid #1B2A4A33",background:"transparent",color:C.navy,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8};
const primary=(background)=>({padding:15,borderRadius:12,border:"none",background,color:C.cream,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8});
