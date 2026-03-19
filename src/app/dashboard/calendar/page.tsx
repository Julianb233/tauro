"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadRow } from "@/types/database";
interface SE{id:string;name:string;date:string|null;time:string|null;propertyAddress:string|null;agentId:string|null;status:string;createdAt:string;}
function parse(leads:LeadRow[]):SE[]{return leads.map(l=>{const m=(l.metadata??{}) as Record<string,unknown>;return{id:l.id,name:`${l.first_name} ${l.last_name}`,date:(m.preferredDate as string)??null,time:(m.preferredTime as string)??null,propertyAddress:(m.propertyAddress as string)??null,agentId:l.agent_id,status:l.status,createdAt:l.created_at};});}
const MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
const DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const SC:Record<string,string>={new:"bg-yellow-500/20 text-yellow-400 border-yellow-500/30",contacted:"bg-blue-500/20 text-blue-400 border-blue-500/30",qualified:"bg-emerald-500/20 text-emerald-400 border-emerald-500/30",closed:"bg-white/10 text-white/50 border-white/20"};
export default function CalendarPage(){
  const [showings,setShowings]=useState<SE[]>([]);const [agents,setAgents]=useState<{id:string;full_name:string}[]>([]);
  const [loading,setLoading]=useState(true);const [cur,setCur]=useState(()=>new Date());const [sel,setSel]=useState<string|null>(null);
  const y=cur.getFullYear(),mo=cur.getMonth();
  const fetchS=useCallback(async()=>{setLoading(true);try{const r=await fetch("/api/leads?type=showing&limit=200");const d=await r.json();setShowings(parse(d.data??[]));}catch{setShowings([]);}finally{setLoading(false);};},[]);
  const fetchA=useCallback(async()=>{try{const r=await fetch("/api/agents");const d=await r.json();setAgents((d.data??[]).map((a:Record<string,unknown>)=>({id:a.id as string,full_name:a.full_name as string})));}catch{setAgents([]);};},[]);
  useEffect(()=>{fetchS();fetchA();},[fetchS,fetchA]);
  const am=useMemo(()=>new Map(agents.map(a=>[a.id,a.full_name])),[agents]);
  const sbd=useMemo(()=>{const m=new Map<string,SE[]>();for(const s of showings){const k=s.date??s.createdAt.split("T")[0];if(!m.has(k))m.set(k,[]);m.get(k)!.push(s);}return m;},[showings]);
  const dim=new Date(y,mo+1,0).getDate(),fd=new Date(y,mo,1).getDay();
  const cells:(number|null)[]=[];for(let i=0;i<fd;i++)cells.push(null);for(let d=1;d<=dim;d++)cells.push(d);
  const today=new Date().toISOString().split("T")[0];
  const selS=sel?(sbd.get(sel)??[]):[];
  return(<div>
    <h1 className="text-2xl font-bold text-off-white">Tour Calendar</h1>
    <p className="mt-1 text-sm text-off-white/50">Showing requests from leads</p>
    {loading?(<div className="mt-6 h-96 animate-pulse rounded-xl border border-white/10 bg-[#1E1E32]"/>):(<div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="rounded-xl border border-white/10 bg-[#1E1E32] p-4">
        <div className="mb-4 flex items-center justify-between"><button onClick={()=>setCur(new Date(y,mo-1,1))} className="rounded p-1.5 text-off-white/60 hover:bg-white/5 hover:text-off-white"><ChevronLeft className="h-5 w-5"/></button><h2 className="text-lg font-semibold text-off-white">{MN[mo]} {y}</h2><button onClick={()=>setCur(new Date(y,mo+1,1))} className="rounded p-1.5 text-off-white/60 hover:bg-white/5 hover:text-off-white"><ChevronRight className="h-5 w-5"/></button></div>
        <div className="grid grid-cols-7 gap-px">{DN.map(d=>(<div key={d} className="py-2 text-center text-xs font-medium text-off-white/40">{d}</div>))}</div>
        <div className="grid grid-cols-7 gap-px">{cells.map((day,i)=>{if(!day)return<div key={"e"+i} className="aspect-square"/>;const ds=`${y}-${String(mo+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;const sh=sbd.get(ds)??[];const isT=ds===today,isS=ds===sel;return(<button key={ds} onClick={()=>setSel(isS?null:ds)} className={cn("relative flex aspect-square flex-col items-center justify-start rounded-lg p-1 text-sm transition-colors",isT&&"ring-1 ring-gold/50",isS?"bg-gold/20 text-gold":"text-off-white/80 hover:bg-white/5")}><span className={cn("text-xs",isT&&"font-bold text-gold")}>{day}</span>{sh.length>0&&<div className="mt-0.5 flex gap-0.5">{sh.length<=3?sh.map((_,j)=>(<span key={j} className="h-1.5 w-1.5 rounded-full bg-gold"/>)):(<><span className="h-1.5 w-1.5 rounded-full bg-gold"/><span className="text-[9px] text-gold">{sh.length}</span></>)}</div>}</button>);})}</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#1E1E32] p-4">
        <h3 className="text-sm font-semibold text-off-white">{sel?new Date(sel+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"Upcoming Showings"}</h3>
        <div className="mt-3 space-y-3">{(sel?selS:showings.filter(s=>s.status!=="closed").slice(0,10)).length===0?(<p className="text-xs text-off-white/40">No showings</p>):(sel?selS:showings.filter(s=>s.status!=="closed").slice(0,10)).map(s=>(<div key={s.id} className={cn("rounded-lg border p-3",SC[s.status]??"")}><div className="flex items-start justify-between"><span className="text-sm font-medium text-off-white">{s.name}</span><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",SC[s.status]??"")}>{s.status}</span></div>{s.time&&<div className="mt-1.5 flex items-center gap-1.5 text-xs text-off-white/50"><Clock className="h-3 w-3"/>{s.time}</div>}{s.propertyAddress&&<div className="mt-1 flex items-center gap-1.5 text-xs text-off-white/50"><MapPin className="h-3 w-3"/>{s.propertyAddress}</div>}{s.agentId&&<div className="mt-1 flex items-center gap-1.5 text-xs text-off-white/50"><User className="h-3 w-3"/>{am.get(s.agentId)??"Assigned"}</div>}</div>))}</div>
      </div>
    </div>)}
  </div>);
}
