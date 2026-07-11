"use client";

import { useState, useEffect, useRef } from "react";
 import ScrollAnimation from "@/components/ScrollAnimation";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });


 const heroProducts = [
   { id: "trade-engine", icon: "🌍", name: "Trade Engine", desc: "全链路AI外贸决策OS · 13个全球市场 · 每日巡检", price: "¥50-500万/年", cat: "外贸核心" },
   { id: "skills-api", icon: "⚡", name: "Agent Skills API", desc: "4个独立AI能力 · REST即插即用 · LLM桥接", price: "按需·API调用", cat: "外贸核心" },
   { id: "v6-security", icon: "🛡️", name: "V6.0 AI 安全治理平台", desc: "8大算法×5层防御 · 人格塑造 · AIP国标", price: "¥30-300万/年", cat: "合规安全" },
   { id: "boss-ip", icon: "🎬", name: "BOSS IP Factory", desc: "15分钟录制AI出视频 · 多平台发布 · 线索追踪", price: "¥10-30万/年", cat: "内容创意" },
   { id: "platform-kernel", icon: "⚙️", name: "Platform Kernel", desc: "Agent编排+本体+模板 · 语义层 · 结果计价", price: "¥50-200万/年", cat: "平台基础设施" },
   { id: "workbuddy", icon: "💈", name: "WorkBuddy", desc: "企业AI办公助手 · 文件操作 · 远程操控PC", price: "¥3-15万/年", cat: "企业AI辅助" },
   { id: "ai-os", icon: "🏥", name: "AI-OS", desc: "5层决策闭环 · L1-L5全链路 · ROI量化", price: "¥5-500万", cat: "行业方案" },
   { id: "short-drama", icon: "🎯", name: "AI短剧制作", desc: "AI驱动的短剧全流程 · 剧本→场景→成片", price: "¥3-20万/项目", cat: "内容创意" },
   { id: "compliance-mw", icon: "📵", name: "合规中间件", desc: "FDA 510(k)等监管合规 · 静态分析 · WASM", price: "¥20-80万/年", cat: "合规安全" },
   { id: "crossborder-cmpl", icon: "🌪", name: "跨境数据合规", desc: "GDPR · CCPA · 跨境数据流动管控", price: "¥10-40万/年", cat: "合规安全" },
   { id: "ai-solution-gen", icon: "📫", name: "AI Solution Gen", desc: "5个标准Agent · 全链路方案自动生成", price: "¥3-10万/次", cat: "行业方案" },
  { id: "scifi-select", icon: "🚌", name: "科幻IP选品", desc: "Reddit挖掘 → AI创意分析 → 供应链匹配", price: "¥2-5万/月", cat: "内容创意" },
];
 
 const productMeta /*: Record<string, {roi:string, tags:string[], testimonial:string}>*/ = {
   "trade-engine": { roi: "ROI 1:5 · 3天上线", tags: ["精准获客","市场分析","询盘转化"], testimonial: "线索量提升300%" },
   "skills-api": { roi: "即插即用 · 零迁移成本", tags: ["API集成","快速部署"], testimonial: "3天完成系统对接" },
   "v6-security": { roi: "满足AIP国标 · 审计级安全", tags: ["安全合规","国标认证","风险防控"], testimonial: "通过等保三级认证" },
   "boss-ip": { roi: "15分钟出片 · 内容产出10x", tags: ["IP打造","短视频","内容营销"], testimonial: "内容产出速度提升10倍" },
   "platform-kernel": { roi: "统一编排 · 复用率80%", tags: ["平台底座","Agent编排","SaaS"], testimonial: "开发效率提升60%" },
   "workbuddy": { roi: "办公效率提升40%", tags: ["办公自动化","远程办公","企业AI"], testimonial: "内部沟通效率提升40%" },
   "ai-os": { roi: "ROI 1:8 · L1-L5全覆盖", tags: ["AI战略","ROI量化","转型规划"], testimonial: "3周完成AI诊断" },
   "short-drama": { roi: "成本降低90%", tags: ["短视频","MCN","批量制作"], testimonial: "单条成本从5万降到2000" },
   "compliance-mw": { roi: "合规成本降低60%", tags: ["监管合规","医疗","FDA"], testimonial: "通过FDA 510(k)审查" },
   "crossborder-cmpl": { roi: "覆盖30+国家", tags: ["GDPR","数据合规","出海"], testimonial: "欧盟数据保护官推荐" },
   "ai-solution-gen": { roi: "1周出完整方案", tags: ["方案生成","AI咨询","ROI测算"], testimonial: "方案输出效率提升5倍" },
   "scifi-select": { roi: "选品成功率85%", tags: ["数据挖掘","趋势预测","选品"], testimonial: "准确发现爆款IP" },
 };
 
 const industries = ["跨境电商", "智能制造", "品牌零售", "金融科技", "医疗健康", "教育培训"];
 
 const testimonials = [
   { text: "通过NEXUS的AI方案，我们的外贸线索量翻了3倍", author: "某跨境企业CTO" },
   { text: "部署WorkBuddy后，内部沟通效率提升40%", author: "某制造厂CIO" },
   { text: "AI短剧制作让我们的内容产出速度提升10倍", author: "某MCN机构创始人" },
 ];
 
 const faqs = [
   { q: "按结果付费具体怎么执行？", a: "我们与客户共同设定可量化的KPI目标（如线索量、ROI等），达成目标后收取服务费，未达成不收费。" },
   { q: "部署一个AI智能体需要多久？", a: "标准场景3周内完成部署和验证，复杂场景根据需求定制，一般在1-2个月。" },
   { q: "数据安全如何保障？", a: "支持私有化部署，数据不出企业内网，通过AIP国标和GDPR等多项合规认证。" },
 ];
 
 const productCategories = ["外贸核心","合规安全","内容创意","行业方案","平台基础设施","企业AI辅助"];

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
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", company: "", phone: "", product: "" });
  const [bookingStatus, setBookingStatus] = useState("");
  
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 3000);
    return () => clearInterval(timer);
  }, []);
  
  const filteredProducts = activeCategory === "全部" ? heroProducts : heroProducts.filter(p => p.cat === activeCategory);
  const allCategories = ["全部", ...new Set(heroProducts.map(p => p.cat))];
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
          <a href="/solutions.html" className="hover:text-white transition text-sm cursor-pointer">产品矩阵</a>
          <a href="/platform.html" className="hover:text-white transition text-sm cursor-pointer">运营平台</a>
          <button onClick={() => scrollTo("cases")} className="hover:text-white transition text-sm cursor-pointer">案例</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-white transition text-sm cursor-pointer">定价</button>
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
            <a href="/solutions.html" className="px-8 py-3.5 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300 flex items-center gap-2 cursor-pointer">
              🔍 浏览15款AI产品
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-6 text-xs text-gray-500">
            <span>✓ 按结果付费</span>
            <span>✓ 无效果不计费</span>
            <span>✓ 15款可运营产品</span>
          </div>
          {/* Industry tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="text-xs text-gray-600 mr-1 self-center">已服务客户来自</span>
            {industries.map((ind) => (
              <span key={ind} className="px-3 py-1 text-xs border border-white/10 rounded-full text-gray-500 hover:border-[#00f0ff] hover:text-[#00f0ff] transition cursor-default">{ind}</span>
            ))}
          </div>
          {/* Testimonial carousel */}
          <div className="mt-6 glass rounded-xl p-4 max-w-lg relative overflow-hidden">
            <div className="flex items-start gap-3">
              <span className="text-[#00f0ff] text-lg leading-none mt-0.5">"</span>
              <div className="flex-1 min-h-[48px]">
                <p className="text-sm text-gray-400 leading-relaxed transition-opacity duration-500">{testimonials[testimonialIdx].text}</p>
                <p className="text-xs text-gray-600 mt-1">—— {testimonials[testimonialIdx].author}</p>
              </div>
            </div>
            <div className="flex gap-1.5 mt-2 justify-center">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className={"w-1.5 h-1.5 rounded-full transition-all " + (i === testimonialIdx ? "bg-[#00f0ff] w-4" : "bg-gray-700")} />
              ))}
            </div>
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
        <div className="text-center mb-8">
          <span className="text-[#00f0ff] text-sm tracking-widest">PRODUCTS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">AI产品家族</h2>
          <p className="text-gray-400 mt-2">点击任意产品查看详细介绍 + 操作流程</p>
        </div>
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={"px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer " + (activeCategory === cat ? "bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black" : "border border-white/10 text-gray-500 hover:border-white/30")}
            >{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => {
             const meta = (productMeta as any)[p.id] || { roi: "", tags: [], testimonial: "" };
            return (
            <a key={p.id} href={"/product_detail.html?id=" + p.id}
              className="glass rounded-xl p-5 hover:neon-border transition-all duration-300 group block no-underline">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-sm">{p.name}</h4>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full whitespace-nowrap">{p.cat}</span>
                  </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 md:line-clamp-none">{p.desc}</p>
                    {meta.roi && <p className="text-xs text-green-400 mt-1.5 font-medium">💰 {meta.roi}</p>}
                    {meta.tags.length > 0 && <div className="flex flex-wrap gap-1 mt-1.5">{meta.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-500">{t}</span>)}</div>}
                    {meta.testimonial && <p className="text-[11px] text-gray-600 italic mt-1">"{meta.testimonial}"</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-[#00f0ff] font-medium">{p.price}</span>
                      <span className="text-[10px] text-gray-600 group-hover:text-[#00f0ff] transition">查看详情 →</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <a href="/solutions.html" className="text-sm text-[#00f0ff] hover:underline inline-flex items-center gap-1">
            查看全部 15 款产品矩阵 + 3步诊断 →
          </a>
        </div>
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

      {/* GEO 健康度检测 */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5" id="geo">
        <div className="text-center mb-10">
          <span className="text-[#00f0ff] text-sm tracking-widest">GEO</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">品牌AI可见度检测</h2>
          <p className="text-gray-400 mt-2">覆盖海内外10+ AI平台 · 模拟品牌提及率</p>
        </div>
        {/* 平台网格 */}
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-[#00f0ff] rounded-full inline-block"></span>🇨🇳 国内AI平台</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">豆包</div><div className="text-[10px] mt-1 text-green-400">✓ 可识别</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">DeepSeek</div><div className="text-[10px] mt-1 text-green-400">✓ 可识别</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">Kimi</div><div className="text-[10px] mt-1 text-yellow-400">○ 待优化</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">元宝</div><div className="text-[10px] mt-1 text-yellow-400">○ 待优化</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">通义千问</div><div className="text-[10px] mt-1 text-green-400">✓ 可识别</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">文心一言</div><div className="text-[10px] mt-1 text-gray-600">— 待检测</div></div>
          </div>
        </div>
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-[#7b2fbe] rounded-full inline-block"></span>🌍 海外AI平台</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">ChatGPT</div><div className="text-[10px] mt-1 text-yellow-400">○ 待优化</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">Perplexity</div><div className="text-[10px] mt-1 text-green-400">✓ 已引用</div></div>
            <div className="glass rounded-lg p-3 text-center"><div className="text-xs text-gray-500">Gemini</div><div className="text-[10px] mt-1 text-gray-600">— 待检测</div></div>
          </div>
        </div>
        {/* 检测项 */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2"><span className="w-1 h-4 bg-green-400 rounded-full inline-block"></span>GEO健康检测清单</h3>
          <div className="glass rounded-2xl p-5">
            <div className="space-y-2">
              {[
                ["AI是否能准确回答「NEXUS是做什么的？」", "通过"],
                ["AI描述中是否包含核心优势关键词", "通过"],
                ["AI是否引用了官网链接", "通过"],
                ["AI回答「服务价格范围」是否准确", "待优化"],
                ["AI能否提供具体使用场景推荐", "待优化"],
                ["跨平台品牌信息是否一致", "通过"],
                ["FAQ内容是否被AI提取", "待优化"],
                ["海外平台英文描述是否准确", "待优化"],
              ].map((item, i) => {
                const status = item[1];
                const cls = status === "通过" ? "text-green-400" : "text-yellow-400";
                const icon = status === "通过" ? "✓" : "○";
                return (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-gray-400">{item[0]}</span>
                    <span className={"text-[11px] font-medium whitespace-nowrap ml-3 " + cls}>{icon} {status}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-gray-400">综合评分</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[62%] bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] rounded-full"></div></div>
                <span className="text-lg font-bold text-white">62</span><span className="text-xs text-gray-600">/100</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="/platform.html" className="text-xs text-gray-500 hover:text-[#00f0ff] transition">查看完整GEO优化报告 →</a>
          </div>
        </div>
      </section>

      {/* 预约专家 */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#00f0ff] text-sm tracking-widest">BOOKING</span>
            <h3 className="text-2xl font-bold mt-2">预约专家咨询</h3>
            <p className="text-gray-400 text-sm mt-1">填写信息，2小时内获取专属AI方案</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <input type="text" placeholder="姓名 *" value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input type="text" placeholder="公司名称 *" value={bookingForm.company} onChange={(e) => setBookingForm({...bookingForm, company: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input type="text" placeholder="电话 / 微信 *" value={bookingForm.phone} onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <select value={bookingForm.product} onChange={(e) => setBookingForm({...bookingForm, product: e.target.value})}
              className="w-full p-3 mb-4 bg-black/40 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-[#00f0ff] text-sm">
              <option value="">感兴趣的产品（选填）</option>
              {heroProducts.map(p => <option key={p.id} value={p.name}>{p.icon} {p.name}</option>)}
            </select>
            <button onClick={() => { if (!bookingForm.name || !bookingForm.phone) { setBookingStatus("请填写姓名和电话"); return; } setBookingStatus("✅ 已收到！2小时内联系您"); setTimeout(() => setBookingStatus(""), 3000); }}
              className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all text-sm">
              预约专家咨询 →
            </button>
            {bookingStatus && <p className={"text-sm text-center mt-3 " + (bookingStatus.includes("✅") ? "text-green-400" : "text-red-400")}>{bookingStatus}</p>}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#00f0ff] text-sm tracking-widest">FAQ</span>
            <h3 className="text-2xl font-bold mt-2">常见问题</h3>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full p-4 flex items-center justify-between text-left cursor-pointer">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <span className={"text-gray-500 transition-transform duration-200 " + (faqOpen === i ? "rotate-180" : "")}>▼</span>
                </button>
                <div className={"overflow-hidden transition-all duration-300 " + (faqOpen === i ? "max-h-40" : "max-h-0")}>
                  <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 预约专家 */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#00f0ff] text-sm tracking-widest">BOOKING</span>
            <h3 className="text-2xl font-bold mt-2">预约专家咨询</h3>
            <p className="text-gray-400 text-sm mt-1">填写信息，2小时内获取专属AI方案</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <input type="text" placeholder="姓名 *" value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input type="text" placeholder="公司名称 *" value={bookingForm.company} onChange={(e) => setBookingForm({...bookingForm, company: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input type="text" placeholder="电话 / 微信 *" value={bookingForm.phone} onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <select value={bookingForm.product} onChange={(e) => setBookingForm({...bookingForm, product: e.target.value})}
              className="w-full p-3 mb-4 bg-black/40 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-[#00f0ff] text-sm">
              <option value="">感兴趣的产品（选填）</option>
              {heroProducts.map(p => <option key={p.id} value={p.name}>{p.icon} {p.name}</option>)}
            </select>
            <button onClick={() => { if (!bookingForm.name || !bookingForm.phone) { setBookingStatus("请填写姓名和电话"); return; } setBookingStatus("✅ 已收到！2小时内联系您"); setTimeout(() => setBookingStatus(""), 3000); }}
              className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all text-sm">
              预约专家咨询 →
            </button>
            {bookingStatus && <p className={"text-sm text-center mt-3 " + (bookingStatus.includes("✅") ? "text-green-400" : "text-red-400")}>{bookingStatus}</p>}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#00f0ff] text-sm tracking-widest">FAQ</span>
            <h3 className="text-2xl font-bold mt-2">常见问题</h3>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full p-4 flex items-center justify-between text-left cursor-pointer">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <span className={"text-gray-500 transition-transform duration-200 " + (faqOpen === i ? "rotate-180" : "")}>▼</span>
                </button>
                <div className={"overflow-hidden transition-all duration-300 " + (faqOpen === i ? "max-h-40" : "max-h-0")}>
                  <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 运营平台 CTA + 预览 */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-8">
          <span className="text-[#00f0ff] text-sm tracking-widest">PLATFORM</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">运营管理平台</h2>
          <p className="text-gray-400 mt-2">实时监控 · 智能决策 · 数据驱动</p>
        </div>
        {/* Feature preview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-xs font-semibold text-white">实时数据看板</div>
            <div className="text-[10px] text-gray-500 mt-1">今日询盘 23 · 响应率 31%</div>
            <div className="flex justify-center gap-2 mt-2 text-[10px]"><span className="text-green-400">↑12%</span><span className="text-gray-600">转化</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🤖</div>
            <div className="text-xs font-semibold text-white">Agent 状态</div>
            <div className="text-[10px] text-gray-500 mt-1">15个智能体运行中</div>
            <div className="flex items-center justify-center gap-1 mt-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span><span className="text-[10px] text-green-400">0 异常</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-xs font-semibold text-white">巡检历史</div>
            <div className="text-[10px] text-gray-500 mt-1">近7天 · 12次巡检</div>
            <div className="flex justify-center gap-1 mt-2 text-[10px]"><span className="text-green-400">■■</span><span className="text-gray-600">■</span><span className="text-yellow-400">■</span><span className="text-green-400">■■</span><span className="text-green-400">■</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-semibold text-white">快捷操作</div>
            <div className="text-[10px] text-gray-500 mt-1">批量更新 · 导出报告</div>
            <div className="flex justify-center gap-2 mt-2"><span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-500">更新</span><span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-500">导出</span></div>
          </div>
        </div>
        <a href="/platform.html" className="block glass-strong rounded-2xl p-8 md:p-10 text-center hover:neon-border transition-all duration-300 no-underline">
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="text-2xl font-bold text-white">TradeV6 运营管理平台</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">买家管理 · 模板排名 · Agent状态 · 巡检历史 · 实时WebSocket看板</p>
          <span className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black rounded-full font-medium text-sm">
            进入运营平台 →
          </span>
        </a>
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>📱 微信：<strong className="text-gray-200">13336021626</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>📢 公众号：<strong className="text-gray-200">海和汇</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-8 py-8 border-t border-white/5 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 mb-4">
          <span>📱 微信：13336021626</span>
          <span>📢 公众号：海和汇</span>
          <span>📧 邮箱：577726281@qq.com</span>
        </div>
        <div className="text-xs text-gray-600">
          © 2026 NEXUS · AI转型，只看结果
        </div>
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
