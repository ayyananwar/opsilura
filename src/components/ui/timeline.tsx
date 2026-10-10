'use client';
// Adapted from Aceternity UI Timeline: https://ui.aceternity.com/components/timeline
// Brand styling replaces the original gradient beam and sample changelog.
import { useScroll, useTransform, useReducedMotion, motion } from 'motion/react';
import { useRef, useEffect, useState, type ReactNode } from 'react';
interface TimelineEntry { title:string; number:string; subtitle:string; content:ReactNode }
export function Timeline({data}:{data:TimelineEntry[]}){
 const ref=useRef<HTMLDivElement>(null);const [height,setHeight]=useState(0);const reduced=useReducedMotion();
 useEffect(()=>{if(!ref.current)return;const update=()=>setHeight(Math.max(0,ref.current!.getBoundingClientRect().height-110));update();const observer=new ResizeObserver(update);observer.observe(ref.current);return()=>observer.disconnect();},[]);
 const {scrollYProgress}=useScroll({target:ref,offset:['start 70%','end 70%']});const heightTransform=useTransform(scrollYProgress,[0,1],[0,height]);
 return <div ref={ref} className="phase-timeline"><div className="timeline-track" aria-hidden="true" style={{height}}><motion.div style={{height:reduced?height:heightTransform}}/></div>{data.map(item=><article key={item.number} className="phase-entry"><div className="phase-index mono">{item.number}</div><div className="phase-title"><h3>{item.title}</h3><p>{item.subtitle}</p></div><div className="phase-body">{item.content}</div></article>)}</div>;
}
