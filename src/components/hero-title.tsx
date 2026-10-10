'use client';
import { useReducedMotion } from 'motion/react';
import { TextEffect } from '@/components/motion-primitives/text-effect';
export function HeroTitle(){const reduced=useReducedMotion();return <h1 className="hero-title"><span className="hero-title-primary"><TextEffect as="span" per="line" preset="slide" variants={{container:{hidden:{opacity:1},visible:{opacity:1}},item:{hidden:{opacity:1,y:reduced?0:12},visible:{opacity:1,y:0}}}} segmentTransition={{duration:reduced?0:0.65,ease:[0.22,1,0.36,1]}}>{'You have enough\non your plate.'}</TextEffect></span><span className="hero-title-secondary">Let’s take the<br/>next thing off it.</span></h1>}

