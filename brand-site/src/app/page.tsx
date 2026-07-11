"use client";

import { useState, useEffect, useRef } from "react";
 import ScrollAnimation from "@/components/ScrollAnimation";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });

 const products = [
   { cat: "拓客", items: [
     { name: "Prospector", desc: "AI主动拓客引擎，多源信号识别高意向买家", badge: "T1" },
     { name: "Trade Radar", desc: "全球贸易数据挖掘，发现潜在采购商", badge: "T1" },
     { name: "Bid Monitor", desc: "采购招标自动监控，每天推送新商机", badge: "T1" },
     { name: "Market Research", desc: "跨市场调研分析，输出准入策略报告", badge: "T2" },
   ]},
   { cat: "分析", items: [
     { name: "Analyzer", desc: "买家意愿评分+竞品威胁检测，Pipeline预测", badge: "T1" },
     { name: "Trade Data", desc: "进出口数据可视化，趋势研判", badge: "T2" },
     { name: "Supply Chain", desc: "供应链风险评估，供应商推荐", badge: "T2" },
     { name: "Compliance", desc: "HS编码归类+关税政策+出口合规审查", badge: "T2" },
   ]},
   { cat: "触达", items: [
     { name: "Outreach", desc: "多渠道自动跟进，自适应时间窗口策略", badge: "T1" },
     { name: "Voice Agent", desc: "AI语音外呼，情感识别+A/B/C/D分级", badge: "T1" },
     { name: "Content Engine", desc: "多语言Listing生成+广告文案", badge: "T2" },
     { name: "Email Campaign", desc: "SMTP/API双通道，智能模板A/B测试", badge: "T1" },
   ]},
   { cat: "运营", items: [
     { name: "A/B Test", desc: "模板对比实验，自动计算统计显著性", badge: "T1" },
     { name: "Buyer Memory", desc: "买家跨周期记忆，不再冷启动", badge: "T1" },
     { name: "Template Store", desc: "模板注册表+Wilson Score自动排名", badge: "T2" },
     { name: "Risk Control", desc: "反滥用风控+代理检测+隐写追踪", badge: "T2" },
   ]},
 ];

 const cases = [
   { client: "浙江某五金工具厂", product: "Prospector + Analyzer", result: "3个月获取27个有效询盘，签约2个北美经销商", roi: "8x" },
   { client: "义乌小商品贸易商", product: "Outreach + Content Engine", result: "AI生成多语言Listing后，谷歌自然流量+340%", roi: "12x" },
   { client: "深圳消费电子品牌", product: "Trade Radar + Bid Monitor", result: "发现3个政府招标项目，中标1个$120K订单", roi: "15x" },
   { client: "广州家居出口商", product: "Voice Agent + Analyzer", result: "AI外呼效率提升5倍，客户转化率+28%", roi: "10x" },
 ];

 const processSteps = [
   { step: "01", title: "诊断", desc: "15分钟AI诊断问卷，锁定高ROI场景", icon: "🔍" },
   { step: "02", title: "配置", desc: "3个工作日内完成Agent初始化+数据对接", icon: "⚙️" },
   { step: "03", title: "运行", desc: "AI自动执行拓客+分析+触达全流程", icon: "🚀" },
   { step: "04", title: "优化", desc: "飞轮自动学习+模板性能排名+持续迭代", icon: "🔄" },
 ];

 const pricing = [
   { name: "免费版", price: "¥0", period: "永久", desc: "核心功能免费试用", features: ["3个Agent", "50次/月API调用", "Community支持"] },
   { name: "成长版", price: "¥999", period: "/月", desc: "初创团队首选", features: ["10个Agent", "500次/月API", "邮件+在线支持", "基础模板库"], popular: false },
   { name: "企业版", price: "¥39,900", period: "/月", desc: "中型企业标准配置", features: ["全部Agent", "无限API调用", "专属客户经理", "定制模板+飞轮", "7x24h支持"], popular: true },
   { name: "出海版", price: "¥99,900", period: "/月", desc: "跨境企业全链路方案", features: ["企业版全部", "多语言内容引擎", "竞争对手监控", "Dify/GEOFlow集成", "优先产品迭代"], popular: false },
 ];

 const scrollTo = (id: string) => {
   const el = document.getElementById(id);
   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 export default function Home() {
  const [liveData, setLiveData] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => prev + Math.floor(Math.random() * 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    need: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.contact) {
      setFormStatus("⚠️ 请填写公司名称和联系人");
      return;
    }
    const record = {
      ...formData,
      time: new Date().toISOString(),
      source: "nexus_hero",
    };
    const existing = JSON.parse(localStorage.getItem("nexus_inquiries") || "[]");
    existing.push(record);
    localStorage.setItem("nexus_inquiries", JSON.stringify(existing));

    setFormStatus("✅ 已收到！2小时内联系您");
    setFormData({ company: "", contact: "", phone: "", need: "" });
    setTimeout(() => {
      setShowForm(false);
      setFormStatus("");
    }, 3000);
  };

  const [activeTab, setActiveTab] = useState<"build" | "visionary" | "agent">("build");

  const tabData = {
    build: {
      label: "BUILD",
      title: "构建·执行",
      desc: "从0到1搭建AI智能体，快速验证业务场景。3周内跑通第一个AI流程。",
      icon: "⚡",
    },
    visionary: {
      label: "VISIONARY",
      title: "远见·规划",
      desc: "3-5年AI战略蓝图，分阶段落地路径。先做高ROI场景，再逐步扩展。",
      icon: "🧠",
    },
    agent: {
      label: "智能体架构",
      title: "多Agent协同",
      desc: "多AI Agent协同编排，形成自进化业务飞轮。越用越聪明，越用越厚壁垒。",
      icon: "🔄",
    },
  };

  const currentTab = tabData[activeTab];
  const [isOnline] = useState(true);
  const totalClients = 2847 + liveData;
  const totalCalls = Math.floor((142 + liveData) * 1.7);
  const todayActive = Math.floor(liveData / 2) + 47;

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-sans">
      <ScrollAnimation />
      <ParticleBackground />
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-white/5 max-w-6xl mx-auto">
        <div className="text-xl font-bold tracking-tight">NEXUS</div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <button onClick={() => scrollTo("products")} className="hover:text-white transition text-sm cursor-pointer">Products</button>
          <button onClick={() => scrollTo("cases")} className="hover:text-white transition text-sm cursor-pointer">Work</button>
          <button onClick={() => scrollTo("process")} className="hover:text-white transition text-sm cursor-pointer">Process</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-white transition text-sm cursor-pointer">Pricing</button>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 border border-white/20 rounded-full text-white hover:bg-white/10 transition">
            Let&apos;s Talk
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="text-sm text-[#00f0ff] tracking-widest mb-4">NEXUS</div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            AI转型，<br />
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] bg-clip-text text-transparent">
              只看结果
            </span>
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            从渠道采购到外贸拓客，全链路落地交付
          </p>

          {/* Live data */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400 border-t border-white/5 pt-6">
            <span>🚀 已服务 <strong className="text-[#00f0ff] text-lg">{totalClients}</strong> 家企业</span>
            <span>⚡ AI调用 <strong className="text-[#00f0ff] text-lg">{totalCalls}</strong> 万次</span>
            <span>📊 今日活跃 <strong className="text-[#00f0ff] text-lg">{todayActive}</strong> 家</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-gray-500 text-xs">实时</span>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button onClick={() => setShowForm(true)} className="px-8 py-3.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-full hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all flex items-center gap-2">
              获取AI落地方案 →
            </button>
            <button onClick={() => scrollTo("products")} className="px-8 py-3.5 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300 flex items-center gap-2 cursor-pointer">
              🔍 浏览AI产品
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-6 text-xs text-gray-500">
            <span>✓ 按结果付费</span>
            <span>✓ 无效果不计费</span>
            <span>✓ 15款可运营产品</span>
          </div>
        </div>
      </section>

      {/* AI Agent Architect with dynamic tabs */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Al Agent Architect</h2>
          <p className="text-gray-400 text-sm mt-2">构建 · 远见 · 智能体架构</p>
        </div>
        <div className="flex justify-center gap-2 flex-wrap mb-8">
          {(["build", "visionary", "agent"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black"
                  : "border border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {tabData[key].label}
            </button>
          ))}
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 transition-all duration-300">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{currentTab.icon}</span>
            <div>
              <h3 className="text-2xl font-bold">{currentTab.title}</h3>
              <p className="text-gray-400 mt-2 max-w-2xl">{currentTab.desc}</p>
              <div className="mt-4 flex gap-2 text-xs">
                <span className="px-3 py-1 bg-white/5 rounded-full text-gray-500">
                  {activeTab === "build" && "⚡ 3周快速验证"}
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-gray-500">
                  {activeTab === "visionary" && "🧭 3-5年蓝图"}
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-gray-500">
                  {activeTab === "agent" && "🔄 自进化飞轮"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">PRODUCTS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">AI产品矩阵</h2>
          <p className="text-gray-400 mt-2">16款可运营产品，覆盖外贸全链路</p>
        </div>
        {products.map((group, gi) => (
          <div key={gi} className="mb-10">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#00f0ff] rounded-full inline-block"></span>
              {group.cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.items.map((p, pi) => (
                <div key={pi} className="glass rounded-xl p-5 hover:neon-border transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{p.name}</h4>
                    <span className={"text-[10px] px-2 py-0.5 rounded-full " + (p.badge==="T1" ? "bg-[#00f0ff]/20 text-[#00f0ff]" : "bg-gray-500/20 text-gray-400")}>{p.badge}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Case Studies */}
      <section id="cases" className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">WORK</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">客户案例</h2>
          <p className="text-gray-400 mt-2">按结果付费的真实效果</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="glass-strong rounded-2xl p-6 md:p-8 hover:neon-border transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white">{c.client}</h3>
                  <span className="text-xs text-gray-500">{c.product}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#00f0ff]">{c.roi}</div>
                  <div className="text-[10px] text-gray-500">ROI</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">合作流程</h2>
          <p className="text-gray-400 mt-2">从诊断到投产，最快3周见效</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {processSteps.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center relative">
              <span className="text-4xl mb-3 block">{s.icon}</span>
              <span className="text-[10px] text-gray-600 font-mono">{s.step}</span>
              <h3 className="font-bold text-white mt-1">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-2">{s.desc}</p>
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 text-gray-700 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">PRICING</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">定价方案</h2>
          <p className="text-gray-400 mt-2">按需选择，随时升级</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {pricing.map((p, i) => (
            <div key={i} className={"rounded-2xl p-6 flex flex-col " + (p.popular ? "neon-border bg-[#00f0ff]/5 scale-105" : "glass")}>
              {p.popular && <div className="text-[10px] text-[#00f0ff] font-semibold tracking-widest mb-2 text-center">推荐</div>}
              <h3 className="font-bold text-white text-lg">{p.name}</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-gray-500 text-sm ml-1">{p.period}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 mb-4">{p.desc}</p>
              <ul className="space-y-2 text-xs text-gray-400 flex-1">
                {p.features.map((f, fi) => <li key={fi} className="flex items-center gap-2"><span className="text-[#00f0ff]">✓</span>{f}</li>)}
              </ul>
              <button onClick={() => setShowForm(true)} className={"mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer " + (p.popular ? "bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black" : "border border-white/15 text-gray-300 hover:bg-white/5")}>
                {p.popular ? "立即开始" : "了解详情"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">合作洽谈</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-400">
                {isOnline ? "在线 · 立即咨询" : "离线 · 留言后联系"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">按结果付费 · 无效果不计费</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-[#00f0ff] text-black rounded-full font-medium hover:shadow-lg hover:shadow-[#00f0ff]/20 transition-all">
              💬 立即沟通
            </button>
            <a href="mailto:contact@nexus.ai" className="px-6 py-3 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300">
              📧 邮件联系
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-8 py-6 border-t border-white/5 text-center text-xs text-gray-600">
        © 2026 NEXUS · AI转型，只看结果
      </footer>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
            <button onClick={() => { setShowForm(false); setFormStatus(""); }} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2">获取AI落地方案</h3>
            <p className="text-gray-400 text-sm mb-6">填写信息，2小时内获取专属方案</p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input type="text" placeholder="公司名称 *" value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]" required />
              <input type="text" placeholder="联系人 *" value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]" required />
              <input type="text" placeholder="电话 / 微信" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]" />
              <textarea placeholder="你的核心需求（可选）" value={formData.need}
                onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                rows={2} className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] resize-none" />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all">
                提交 → 2小时内回复
              </button>
              {formStatus && (
                <p className={"text-sm text-center " + (formStatus.includes("✅") ? "text-green-400" : "text-red-400")}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
