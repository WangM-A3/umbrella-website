// app/page.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import ScrollAnimation from "@/components/ScrollAnimation";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);

  // 数字滚动动画（简化版）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('count-up');
          }
        });
      },
      { threshold: 0.5 }
    );

    const statItems = document.querySelectorAll('.stat-number');
    statItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <ScrollAnimation />
      <ParticleBackground />
      {/* ===== 导航栏 ===== */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <span className={`font-orbitron text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent`}>
          NEXUS
        </span>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#work" className="hover:text-white transition">Work</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <button className="px-5 py-2 rounded-full border border-cyan-400/30 text-sm hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all duration-300">
          Let's Talk
        </button>
      </nav>

      {/* ===== HERO 主视觉 ===== */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20">
        {/* 背景装饰光晕 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* 主标题 NEXUS */}
          <h1 className={`font-orbitron text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]`}>
            <span className="bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
              NEXUS
            </span>
          </h1>

          {/* 副标题 - 打字机效果 */}
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-2xl font-light tracking-wide">
            AI转型，只看结果
          </p>
          <p className="mt-2 text-sm text-gray-500 max-w-xl">从渠道采购到外贸拓客，全链路落地交付</p>

          {/* 身份标签 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm">
              AI Agent Architect
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-400">构建 · 远见 · 智能体架构</span>
          </div>

          {/* 三关键词网格 */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {['Build', 'Visionary', 'AI智能体架构'].map((word, i) => (
              <div
                key={i}
                className="px-4 py-2 text-center text-xs font-medium tracking-wider uppercase border border-white/5 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300 cursor-default"
              >
                {word}
              </div>
            ))}
          </div>

          {/* 双 CTA 按钮 */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-medium flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,212,255,0.25)]">
              获取AI落地方案
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-3.5 rounded-full border border-white/20 text-gray-300 font-medium hover:bg-white/5 hover:border-cyan-400/50 transition-all duration-300">
              合作洽谈
            </button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-xs text-cyan-300/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            按结果付费 · 无效果不计费
          </div>
        </div>
      </section>

      {/* ===== 数据统计区 ===== */}
      <section className="py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '8+', label: 'Years Exp' },
            { num: '50+', label: 'Projects Delivered' },
            { num: '20+', label: 'Agent Systems' },
            { num: '∞', label: 'Core Competencies' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className={`stat-number text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent`}>
                {stat.num}
              </div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* ===== 服务模式 ===== */}
      <section id="service-mode" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400/60 uppercase">Service Mode</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-4">全链路AI落地服务</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">从品牌曝光到成交转化，一站式 AI 解决方案</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div data-animate className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 p-6 overflow-hidden hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="font-orbitron text-lg font-bold tracking-wide text-white/90">AI渠道 · 品牌流量</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">火山引擎 · 豆包 · OpenAI 等主流AI平台官方代理，撒动品牌曝光</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
            <div data-animate data-animate-delay="0.1" className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 p-6 overflow-hidden hover:border-purple-400/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">🧬</div>
                <h3 className="font-orbitron text-lg font-bold tracking-wide text-white/90">外贸获客 · 智能体搭建</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed break-words">百雀AI一站式外贸拓客，WorkBuddy企业智能体私有化部署</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
            <div data-animate data-animate-delay="0.2" className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 p-6 overflow-hidden hover:border-emerald-400/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-orbitron text-lg font-bold tracking-wide text-white/90">数字化咨询 · 算力配套</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">企业AI数字化全案咨询 · OPC孵化园算力平台 · AI大模型引擎优化</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 合作流程 ===== */}
      <section id="process" className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-purple-400/60 uppercase">Process</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mt-4">诊断 · 方案 · 部署 · 运维</h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">全链路交付体系，确保每个环节可量化、可追踪</p>
          </div>
          <div className="grid md:grid-cols-4 gap-0 md:gap-4 relative">
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400" />
            {[
              { step: "01", title: "诊断", desc: "企业AI现状评估，挖掘高价值场景", icon: "🔍", color: "from-cyan-400 to-blue-500" },
              { step: "02", title: "方案", desc: "量身定制AI落地方案，适配业务流程", icon: "📋", color: "from-purple-400 to-pink-500" },
              { step: "03", title: "部署", desc: "智能体搭建 + 算力配套，数据安全可控", icon: "⚙️", color: "from-emerald-400 to-teal-500" },
              { step: "04", title: "运维", desc: "持续优化迭代，保障系统稳定运行", icon: "🔄", color: "from-amber-400 to-orange-500" },
            ].map((p, i) => (
              <div key={i} data-animate data-animate-delay={String(i * 0.1)} className="relative flex flex-col items-center text-center p-6">
                <div className={"relative z-10 w-14 h-14 rounded-full bg-gradient-to-br " + p.color + " flex items-center justify-center text-xl shadow-lg mb-4"}>{p.icon}</div>
                <span className="font-mono text-xs text-gray-600 mb-1">{p.step}</span>
                <h3 className="font-orbitron text-lg font-bold text-white/90">{p.title}</h3>
                <p className="mt-2 text-xs text-gray-500 max-w-[200px]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 成功案例 ===== */}
      <section id="cases" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-0.5 bg-purple-400" />
            <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">Cases</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-2">成功案例 · 合作洽谈</h2>
          <p className="text-gray-500 text-sm mb-10">A glimpse into the systems and tools I've architected. 带你一瞧我设计搭建的系统与工具。</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "外贸行业", title: "AI拓客提升300%线索量", desc: "某外贸企业通过百雀AI智能体实现精准获客" },
              { tag: "品牌零售", title: "AI客服降低60%成本", desc: "某品牌方部署WorkBuddy智能体，替代人工客服" },
              { tag: "制造业", title: "全链路降本增效", desc: "某制造厂通过数字化咨询优化生产流程" },
            ].map((cc, i) => (
              <div key={i} data-animate data-animate-delay={String(i * 0.1)}
                className="group relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 overflow-hidden hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative z-10 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-500 font-mono mb-2">{cc.tag}</span>
                    <h3 className="font-orbitron text-lg font-bold text-white/90">{cc.title}</h3>
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">{cc.desc}</p>
                  </div>
                </div>
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-gray-600">扫码获取AI落地方案 / 项目报价</p>
        </div>
      </section>      {/* ===== Footer / CTA ===== */}
      <section id="contact" className="py-20 px-6 md:px-12 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h3 className={`font-orbitron text-3xl font-bold mb-4`}>
            准备好<span className="text-cyan-400">构建</span>未来了吗？
          </h3>
          <p className="text-gray-400 text-sm mb-6">让我们一起打造下一代智能代理系统。</p>
          <p className="mb-8 text-xs text-gray-600">无效果不计费，全链路落地交付</p>
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-medium hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(0,212,255,0.2)]">
            按结果付费 · 立即咨询
          </button>
          <div className="mt-8 flex justify-center gap-6 text-gray-600">
                      <div className="mt-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-cyan-400/30 flex items-center justify-center hover:border-cyan-400/60 transition-colors cursor-pointer group">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400/40 group-hover:text-cyan-400/70 transition-colors">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3M17 17v.5M17 21v.5M21 17h.5M21 21v.5" />
              </svg>
            </div>
            <span className="mt-2 text-[10px] text-gray-600">扫码咨询</span>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-gray-500">
            <a href="#" className="flex flex-col items-center gap-1.5 hover:text-cyan-400 transition cursor-pointer group">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Z" /><path d="M7 16v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" />
              </svg>
              <span className="text-[10px] text-gray-600 group-hover:text-cyan-400 transition">公众号</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-1.5 hover:text-cyan-400 transition cursor-pointer group">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[10px] text-gray-600 group-hover:text-cyan-400 transition">个人微信</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-1.5 hover:text-cyan-400 transition cursor-pointer group">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span className="text-[10px] text-gray-600 group-hover:text-cyan-400 transition">官网</span>
            </a>
          </div>
          </div>
          <p className="mt-6 text-xs text-gray-700">© 2026 NEXUS · AI Agent Architect</p>
        </div>
      </section>
    </div>
  );
}