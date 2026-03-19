"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, X, Mail, Phone } from "lucide-react";
import type { AgentRow } from "@/types/database";
interface AF{slug:string;first_name:string;last_name:string;title:string;email:string;phone:string;photo:string;bio:string;short_bio:string;specialties:string[];neighborhoods:string[];languages:string[];license_number:string;}
const ef:AF={slug:"",first_name:"",last_name:"",title:"",email:"",phone:"",photo:"",bio:"",short_bio:"",specialties:[],neighborhoods:[],languages:[],license_number:""};
export default function AgentsPage(){
  const [agents,setAgents]=useState<AgentRow[]>([]);const [loading,setLoading]=useState(true);const [showForm,setShowForm]=useState(false);
  const [editingId,setEditingId]=useState<string|null>(null);const [form,setForm]=useState<AF>(ef);const [saving,setSaving]=useState(false);
  const [si,setSi]=useState("");const [ni,setNi]=useState("");const [li,setLi]=useState("");
  const fa=useCallback(async()=>{setLoading(true);try{const r=await fetch("/api/agents");const d=await r.json();setAgents(d.data??[]);}catch{setAgents([]);}finally{setLoading(false);};},[]);
  useEffect(()=>{fa();},[fa]);
  const oaf=()=>{setEditingId(null);setForm(ef);setShowForm(true);};
  const oef=(a:AgentRow)=>{setEditingId(a.id);setForm({slug:a.slug,first_name:a.first_name,last_name:a.last_name,title:a.title,email:a.email,phone:a.phone,photo:a.photo??"",bio:a.bio??"",short_bio:a.short_bio??"",specialties:a.specialties??[],neighborhoods:a.neighborhoods??[],languages:a.languages??[],license_number:a.license_number??""});setShowForm(true);};
  const hs=async()=>{setSaving(true);try{await fetch("/api/agents",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});setShowForm(false);fa();}finally{setSaving(false);}};
  const uf=<K extends keyof AF>(k:K,v:AF[K])=>{setForm(p=>({...p,[k]:v}));};
  const at=(f:"specialties"|"neighborhoods"|"languages",v:string)=>{const t=v.trim();if(t&&!form[f].includes(t))setForm(p=>({...p,[f]:[...p[f],t]}));};
  const rt=(f:"specialties"|"neighborhoods"|"languages",i:number)=>{setForm(p=>({...p,[f]:p[f].filter((_,j)=>j!==i)}));};
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-off-white">Agents</h1><span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">{agents.length}</span></div>
        <button onClick={oaf} className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors"><Plus className="h-4 w-4"/>Add Agent</button>
      </div>
      <div className="mt-6">
        {loading?(<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({length:3}).map((_,i)=>(<div key={i} className="h-48 animate-pulse rounded-xl border border-white/10 bg-[#1E1E32]"/>))}</div>):agents.length===0?(<div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#1E1E32] py-16"><p className="text-sm text-off-white/40">No agents found</p></div>):(
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{agents.map(a=>(<div key={a.id} className="rounded-xl border border-white/10 bg-[#1E1E32] p-5 transition-all hover:border-gold/20"><div className="flex items-start gap-4">{a.photo?(<img src={a.photo} alt={a.full_name} className="h-14 w-14 shrink-0 rounded-full border-2 border-gold/30 object-cover"/>):(<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/10 text-lg font-bold text-gold">{a.first_name[0]}{a.last_name[0]}</div>)}<div className="min-w-0 flex-1"><h3 className="font-semibold text-off-white truncate">{a.full_name}</h3><p className="text-sm text-gold/80">{a.title}</p></div><button onClick={()=>oef(a)} className="rounded p-1.5 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors shrink-0" aria-label="Edit"><Pencil className="h-3.5 w-3.5"/></button></div>
            <div className="mt-4 space-y-1.5"><a href={`mailto:${a.email}`} className="flex items-center gap-2 text-xs text-off-white/50 hover:text-gold transition-colors"><Mail className="h-3 w-3"/>{a.email}</a><a href={`tel:${a.phone}`} className="flex items-center gap-2 text-xs text-off-white/50 hover:text-gold transition-colors"><Phone className="h-3 w-3"/>{a.phone}</a></div>
            {a.specialties.length>0&&(<div className="mt-3 flex flex-wrap gap-1">{a.specialties.slice(0,3).map(s=>(<span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-off-white/40">{s}</span>))}{a.specialties.length>3&&(<span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-off-white/30">+{a.specialties.length-3}</span>)}</div>)}</div>))}</div>
        )}
      </div>
      {showForm&&(<><div className="fixed inset-0 z-40 bg-black/50" onClick={()=>setShowForm(false)}/><div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-white/10 bg-[#141425] sm:w-[520px]"><div className="flex items-center justify-between border-b border-white/5 p-5"><h2 className="text-lg font-bold text-off-white">{editingId?"Edit Agent":"Add Agent"}</h2><button onClick={()=>setShowForm(false)} className="rounded p-1 text-off-white/40 hover:text-off-white"><X className="h-5 w-5"/></button></div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-4"><FI l="First Name" v={form.first_name} o={v=>uf("first_name",v)}/><FI l="Last Name" v={form.last_name} o={v=>uf("last_name",v)}/></div>
          <div className="grid grid-cols-2 gap-4"><FI l="Slug" v={form.slug} o={v=>uf("slug",v)}/><FI l="Title" v={form.title} o={v=>uf("title",v)}/></div>
          <div className="grid grid-cols-2 gap-4"><FI l="Email" v={form.email} o={v=>uf("email",v)}/><FI l="Phone" v={form.phone} o={v=>uf("phone",v)}/></div>
          <FI l="Photo URL" v={form.photo} o={v=>uf("photo",v)}/><FI l="License" v={form.license_number} o={v=>uf("license_number",v)}/>
          <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Short Bio</label><textarea value={form.short_bio} onChange={e=>uf("short_bio",e.target.value)} rows={2} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 resize-none"/></div>
          <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Bio</label><textarea value={form.bio} onChange={e=>uf("bio",e.target.value)} rows={4} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 resize-none"/></div>
          <TI l="Specialties" tags={form.specialties} iv={si} oic={setSi} oa={()=>{at("specialties",si);setSi("");}} or={i=>rt("specialties",i)}/>
          <TI l="Neighborhoods" tags={form.neighborhoods} iv={ni} oic={setNi} oa={()=>{at("neighborhoods",ni);setNi("");}} or={i=>rt("neighborhoods",i)}/>
          <TI l="Languages" tags={form.languages} iv={li} oic={setLi} oa={()=>{at("languages",li);setLi("");}} or={i=>rt("languages",i)}/>
          <div className="flex gap-3 pt-2"><button onClick={hs} disabled={saving} className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors disabled:opacity-50">{saving?"Saving...":editingId?"Update":"Create"}</button><button onClick={()=>setShowForm(false)} className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-off-white/60 hover:bg-white/5 transition-colors">Cancel</button></div>
        </div></div></>)}
    </div>
  );
}
function FI({l,v,o}:{l:string;v:string;o:(v:string)=>void}){return(<div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{l}</label><input type="text" value={v} onChange={e=>o(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50"/></div>);}
function TI({l,tags,iv,oic,oa,or}:{l:string;tags:string[];iv:string;oic:(v:string)=>void;oa:()=>void;or:(i:number)=>void}){return(<div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{l}</label><div className="flex gap-2"><input type="text" value={iv} onChange={e=>oic(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();oa();}}} placeholder={`Add ${l.toLowerCase()}...`} className="flex-1 rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50"/><button type="button" onClick={oa} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white/70 hover:bg-white/5 transition-colors">Add</button></div>{tags.length>0&&(<div className="mt-2 flex flex-wrap gap-1.5">{tags.map((t,i)=>(<span key={i} className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs text-gold">{t}<button onClick={()=>or(i)} className="text-gold/50 hover:text-gold"><X className="h-3 w-3"/></button></span>))}</div>)}</div>);}
