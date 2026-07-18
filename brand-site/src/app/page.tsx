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
   { id: "workbuddy", icon: "💈", name: "WorkBuddy", desc: "企业AI办公助手 · 智能报价 · 远程操控PC · 录制自动化", price: "¥3-15万/年", cat: "企业AI辅助" },
   { id: "ai-os", icon: "🏥", name: "AI-OS", desc: "5层决策闭环 · L1-L5全链路 · ROI量化", price: "¥5-500万", cat: "行业方案" },
   { id: "short-drama", icon: "🎯", name: "AI短剧制作", desc: "AI驱动的短剧全流程 · 剧本→场景→成片", price: "¥3-20万/项目", cat: "内容创意" },
   { id: "compliance-mw", icon: "📵", name: "合规中间件", desc: "FDA 510(k)等监管合规 · 静态分析 · WASM", price: "¥20-80万/年", cat: "合规安全" },
   { id: "crossborder-cmpl", icon: "🌪", name: "跨境数据合规", desc: "GDPR · CCPA · 跨境数据流动管控", price: "¥10-40万/年", cat: "合规安全" },
   { id: "ai-solution-gen", icon: "📫", name: "AI Solution Gen", desc: "5个标准Agent · 全链路方案自动生成", price: "¥3-10万/次", cat: "行业方案" },
  { id: "scifi-select", icon: "🚌", name: "科幻IP选品", desc: "Reddit挖掘 → AI创意分析 → 供应链匹配", price: "¥2-5万/月", cat: "内容创意" },
  { id: "bid-compliance", icon: "📋", name: "招标AI检测", desc: "响应发改委195号文 · 招标文件合规性自动检测 · AI+规则双引擎", price: "按需定价", cat: "合规安全" },
];
 
 const productMeta /*: Record<string, {roi:string, tags:string[], testimonial:string}>*/ = {
   "trade-engine": { roi: "ROI 1:5 · 3天上线", tags: ["精准获客","市场分析","询盘转化"], testimonial: "线索量提升300%" },
   "skills-api": { roi: "即插即用 · 零迁移成本", tags: ["API集成","快速部署"], testimonial: "3天完成系统对接" },
   "v6-security": { roi: "满足AIP国标 · 审计级安全", tags: ["安全合规","国标认证","风险防控"], testimonial: "通过等保三级认证" },
   "boss-ip": { roi: "15分钟出片 · 内容产出10x", tags: ["IP打造","短视频","内容营销"], testimonial: "内容产出速度提升10倍" },
   "platform-kernel": { roi: "统一编排 · 复用率80%", tags: ["平台底座","Agent编排","SaaS"], testimonial: "开发效率提升60%" },
   "workbuddy": { roi: "办公效率提升40% · 报价3分钟", tags: ["办公自动化","智能报价","远程办公","企业AI"], testimonial: "3分钟生成多语种合规报价" },
   "ai-os": { roi: "ROI 1:8 · L1-L5全覆盖", tags: ["AI战略","ROI量化","转型规划"], testimonial: "3周完成AI诊断" },
   "short-drama": { roi: "成本降低90%", tags: ["短视频","MCN","批量制作"], testimonial: "单条成本从5万降到2000" },
   "compliance-mw": { roi: "合规成本降低60%", tags: ["监管合规","医疗","FDA"], testimonial: "通过FDA 510(k)审查" },
   "crossborder-cmpl": { roi: "覆盖30+国家", tags: ["GDPR","数据合规","出海"], testimonial: "欧盟数据保护官推荐" },
   "ai-solution-gen": { roi: "1周出完整方案", tags: ["方案生成","AI咨询","ROI测算"], testimonial: "方案输出效率提升5倍" },
  "scifi-select": { roi: "选品成功率85%", tags: ["数据挖掘","趋势预测","选品"], testimonial: "准确发现爆款IP" },
  "bid-compliance": { roi: "3分钟出报告 · 覆盖5大维度", tags: ["招标","合规","AI检测"], testimonial: "检测准确率92%" },
};
 
  const industries = ["跨境电商", "智能制造", "品牌零售", "金融科技", "医疗健康", "教育培训"];
 
 const testimonials = [
   { text: "通过NEXUS的AI方案，我们的外贸线索量翻了3倍", author: "某跨境企业CTO" },
   { text: "部署WorkBuddy后，内部沟通效率提升40%", author: "某制造厂CIO" },
   { text: "AI短剧制作让我们的内容产出速度提升10倍", author: "某MCN机构创始人" },
 ];
 
 const diagnoseQuestions = [
   { id: "pain", text: "目前最想用AI解决什么问题？", options: [
     { label: "🎯 获客太难", value: "prospect", match: ["trade-engine","skills-api","boss-ip"] },
     { label: "🛡️ 合规压力大", value: "compliance", match: ["v6-security","compliance-mw","crossborder-cmpl"] },
     { label: "🎬 内容生产慢", value: "content", match: ["boss-ip","short-drama","scifi-select"] },
     { label: "⚡ 效率待提升", value: "efficiency", match: ["platform-kernel","workbuddy","ai-os"] },
   ]},
   { id: "scale", text: "企业规模？", options: [
     { label: "🌱 初创（<50人）", value: "startup", match: ["skills-api","workbuddy","ai-solution-gen"] },
     { label: "📈 成长（50-500人）", value: "scale", match: ["trade-engine","boss-ip","platform-kernel"] },
     { label: "🏢 集团（>500人）", value: "enterprise", match: ["v6-security","platform-kernel","compliance-mw"] },
   ]},
   { id: "speed", text: "希望多久看到效果？", options: [
     { label: "⚡ 1周内", value: "fast", match: ["skills-api","workbuddy","ai-solution-gen"] },
     { label: "📅 1个月内", value: "medium", match: ["trade-engine","boss-ip","short-drama"] },
     { label: "🎯 3个月+", value: "long", match: ["v6-security","platform-kernel","compliance-mw"] },
   ]},
 ];
 
 const faqs = [
  { q: "按效果付费具体怎么执行？", a: "我们与客户共同设定可量化的KPI目标（如线索量、ROI等），达成目标后收取服务费，未达成不收费。" },
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
  const [bookingStatus, setBookingStatus] = useState("");
  const [diagnoseOpen, setDiagnoseOpen] = useState(false);
  const [diagnoseStep, setDiagnoseStep] = useState(0);
  const [diagnoseAnswers, setDiagnoseAnswers] = useState<Record<string, string>>({});
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const badgeDetails: Record<string, {desc: string, detail: string}> = {
    "AIP国标": { desc: "AI安全治理平台认证", detail: "通过国家AI安全治理标准（AIP）认证，确保平台在数据安全、算法透明、隐私保护等方面符合国家级规范。" },
    "等保三级": { desc: "国家信息安全等级保护", detail: "通过国家信息安全等级保护三级认证，平台具备完善的网络安全防护体系，适用于政府、金融等高安全要求行业。" },
    "GDPR/CCPA": { desc: "欧盟/加州数据合规", detail: "符合GDPR（通用数据保护条例）和CCPA（加州消费者隐私法案）要求，保障跨境数据处理合规性。" },
    "FDA 510(k)": { desc: "医疗器械合规中间件", detail: "遵循FDA 510(k)医疗器械上市前通知要求，为医疗AI产品提供合规性检测与文档生成服务。" },
    "国家高新技术企业": { desc: "国家级科技企业认定", detail: "获得国家高新技术企业认定，享受税收优惠与政策支持，体现企业在AI技术领域的创新能力。" },
  };
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);
  const closeAllMenus = () => setOpenMenu(null);
  const executionSteps = [
    { icon: "🤖", title: "AI开始分析", desc: "接收客户需求，启动智能分析引擎", duration: 1000 },
    { icon: "🔍", title: "搜索引擎查询", desc: "查找行业同类方案，分析最佳实践", duration: 1500 },
    { icon: "📊", title: "数据分析", desc: "对比行业基准数据，识别痛点与机会", duration: 1200 },
    { icon: "📝", title: "方案生成", desc: "根据分析结果，定制AI落地方案", duration: 1000 },
    { icon: "✅", title: "方案完成", desc: "生成优化报告，输出推荐方案", duration: 800 },
  ];
  const [executionStep, setExecutionStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const executionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStepRef = useRef(0);

  // DualPanel auto-play timer: restart whenever executionStep changes externally or on mount
  useEffect(() => {
    if (!isPlaying || executionStep >= executionSteps.length) {
      if (executionStep >= executionSteps.length) setIsPlaying(false);
      return;
    }
    executionTimerRef.current = setTimeout(() => {
      setExecutionStep((prev) => prev + 1);
    }, executionSteps[executionStep].duration);
    return () => { if (executionTimerRef.current) clearTimeout(executionTimerRef.current); };
  }, [executionStep, isPlaying]);

  // Reset dualpanel when diagnose button is clicked
  const startDiagnose = () => { setDiagnoseOpen(true); setDiagnoseStep(0); setDiagnoseAnswers({}); };
  const startExecution = () => { setExecutionStep(0); setIsPlaying(true); };
  const bookingNameRef = useRef<HTMLInputElement>(null);
  const bookingCompanyRef = useRef<HTMLInputElement>(null);
  const bookingPhoneRef = useRef<HTMLInputElement>(null);
  const bookingProductRef = useRef<HTMLSelectElement>(null);
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = bookingNameRef.current?.value?.trim() || "";
    const phone = bookingPhoneRef.current?.value?.trim() || "";
    if (!name || !phone) { setBookingStatus("请填写姓名和电话"); return; }
    setBookingStatus("✅ 已收到！2小时内联系您");
    setTimeout(() => setBookingStatus(""), 3000);
    if (bookingNameRef.current) bookingNameRef.current.value = "";
    if (bookingCompanyRef.current) bookingCompanyRef.current.value = "";
    if (bookingPhoneRef.current) bookingPhoneRef.current.value = "";
    if (bookingProductRef.current) bookingProductRef.current.value = "";
  };
  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };
  
  const getMatchedProducts = () => {
    const scores: Record<string, number> = {};
    Object.values(diagnoseAnswers).forEach((ans) => {
      const q = diagnoseQuestions.find((q) => q.options.some((o) => o.value === ans));
      const opt = q?.options.find((o) => o.value === ans);
      opt?.match.forEach((id) => { scores[id] = (scores[id] || 0) + 1; });
    });
    return heroProducts.filter((p) => scores[p.id]).sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).slice(0, 3);
  };
  
  const calcROI = (teamSize: number, leads: number, conversion: number) => {
    const annualValue = leads * 12 * conversion * 50000;
    const improvedLeads = leads * 3.2;
    const improvedValue = improvedLeads * 12 * (conversion * 1.4) * 50000;
    const cost = teamSize <= 20 ? 1198800 : teamSize <= 100 ? 598800 : 1198800;
    const roi = ((improvedValue - annualValue - cost) / cost) * 100;
    return { current: annualValue, projected: improvedValue, roi: Math.round(roi), cost };
  };
 
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 3000);
    return () => clearInterval(timer);
  }, []);
  
  const filteredProducts = activeCategory === "全部" ? heroProducts : heroProducts.filter(p => p.cat === activeCategory);
  const allCategories = ["全部", ...new Set(heroProducts.map(p => p.cat))];
  const totalClients = 2849 + Math.floor(liveData * 0.05);
  const totalCalls = 244 + Math.floor(liveData * 0.02);
  const todayActive = 48 + Math.floor(liveData * 0.1);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-sans">
      <ScrollAnimation />
      <ParticleBackground />
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-white/5 max-w-6xl mx-auto">
        <a href="/" className="text-xl font-bold tracking-tight">NEXUS</a>
        
        {/* Main Navigation */}
        <div className="hidden md:flex items-center gap-5 text-sm text-gray-400">
          {/* Solutions Dropdown */}
          <div className="relative">
            <button onClick={() => toggleMenu("solutions")} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              解决方案 <span className="text-[10px]">&#9660;</span>
            </button>
            <div className={"absolute top-full left-0 mt-2 w-56 bg-[#1a1a3e]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 transition-all duration-200 shadow-xl z-50 " + (openMenu === "solutions" ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none")}>
              <a href="/product_detail.html?id=trade-engine" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">外贸增长方案</a>
              <a href="/solutions.html" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">品牌流量方案</a>
              <a href="/product_detail.html?id=ai-os" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">企业智能化方案</a>
              <a href="/product_detail.html?id=v6-security" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">合规与安全方案</a>
            </div>
          </div>
          
          {/* Products Dropdown */}
          <div className="relative">
            <button onClick={() => toggleMenu("products")} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              产品 <span className="text-[10px]">&#9660;</span>
            </button>
            <div className={"absolute top-full left-0 mt-2 w-64 bg-[#1a1a3e]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 transition-all duration-200 shadow-xl z-50 " + (openMenu === "products" ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none")}>
              <a href="/products" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">AI产品家族（15款）</a>
              <a href="/product_detail.html?id=skills-api" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">API文档与集成</a>
              <a href="/platform.html" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">运营管理平台</a>
              <a href="/bid-check.html" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">📋 招标AI检测</a>
            </div>
          </div>
          
          <a href="/cases" className="hover:text-white transition-colors">客户案例</a>
          
          {/* Resources Dropdown */}
          <div className="relative">
            <button onClick={() => toggleMenu("resources")} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              资源中心 <span className="text-[10px]">&#9660;</span>
            </button>
            <div className={"absolute top-full left-0 mt-2 w-56 bg-[#1a1a3e]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 transition-all duration-200 shadow-xl z-50 " + (openMenu === "resources" ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none")}>
              <a href="/roi-calculator" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">ROI计算器</a>
              <a href="/geo" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">GEO品牌检测</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); closeAllMenus(); setShowForm(true); }} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">📄 行业白皮书</a>
              <a href="/diagnose" onClick={closeAllMenus} className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">AI智能诊断</a>
            </div>
          </div>
          
          <button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors cursor-pointer">定价</button>
        </div>
        
        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-[#00f0ff] border border-[#00f0ff]/30 px-3 py-1 rounded-full">
            按结果付费
          </span>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="bg-[#00f0ff] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00f0ff]/80 transition-colors cursor-pointer inline-block">
            立即咨询
          </a>
          <button className="md:hidden text-white text-xl cursor-pointer">&#9776;</button>
        </div>
      </nav>
      {openMenu && <div className="fixed inset-0 z-40" onClick={closeAllMenus}></div>}

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
              <span className="text-gray-500 text-xs">实时</span><span className="ml-2 px-2 py-0.5 rounded-full text-[9px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] whitespace-nowrap">🤖 自主决策 33%</span><div className="bg-white/5 text-gray-600 text-[10px] px-1.5 py-0.5 rounded ml-1 inline-block">demo</div>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contact" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="px-6 py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-full hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all flex items-center gap-2 text-sm cursor-pointer">
              获取AI落地方案 →
            </a>
            <a href="/playground" className="px-6 py-3 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300 flex items-center gap-2 cursor-pointer">
              ⚡ 体验API/Skills
            </a>
            <a href="/diagnose" onClick={(e) => { e.preventDefault(); setDiagnoseOpen(true); setDiagnoseStep(0); setDiagnoseAnswers({}); }} className="px-6 py-3 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300 flex items-center gap-2 text-sm cursor-pointer">
              🎯 3步AI诊断
            </a>
            <a href="/products" className="px-8 py-3.5 border border-white/15 rounded-full hover:bg-white/5 transition text-gray-300 flex items-center gap-2 cursor-pointer">
              🔍 浏览15款AI产品
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-6 text-xs text-gray-500">
            <span>✓ 按效果付费</span>
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

      {/* Services */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">全链路AI落地服务</h2>
          <p className="text-gray-400 mt-2">从渠道采购到外贸拓客，从算力配套到智能体搭建</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-8 hover:neon-border transition-all duration-300 group">
            <span className="text-4xl mb-4 block">📡</span>
            <h3 className="text-lg font-bold text-white mb-3">AI渠道 & 品牌流量</h3>
            <p className="text-sm text-gray-400 leading-relaxed">火山引擎 · 豆包 · OpenAI 等主流AI平台官方代理，撬动品牌曝光与流量增长，帮助企业在AI生态中建立品牌认知。</p>
            <div className="mt-4 flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">火山引擎</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">豆包</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">OpenAI</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-8 hover:neon-border transition-all duration-300 group">
            <span className="text-4xl mb-4 block">🌍</span>
            <h3 className="text-lg font-bold text-white mb-3">外贸获客 & 智能体搭建</h3>
            <p className="text-sm text-gray-400 leading-relaxed">百雀AI一站式外贸拓客解决方案，WorkBuddy企业智能体私有化部署，从线索挖掘到成交转化全链路AI赋能。</p>
            <div className="mt-4 flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">百雀AI</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">WorkBuddy</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">智能体团队</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-8 hover:neon-border transition-all duration-300 group">
            <span className="text-4xl mb-4 block">💻</span>
            <h3 className="text-lg font-bold text-white mb-3">数字化咨询 & 算力配套</h3>
            <p className="text-sm text-gray-400 leading-relaxed">企业AI数字化全案咨询 · OPC孵化园算力平台 · AI大模型引擎优化，为企业AI转型提供从战略到算力的完整支撑。</p>
            <div className="mt-4 flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">全案咨询</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">算力平台</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-500">引擎优化</span>
            </div>
          </div>
        </div>
      </section>

      {/* DualPanel: Transparent Operation Display */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">DEMO</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">透明化操作展示</h2>
          <p className="text-gray-400 mt-2">AI自主工作演示：上传产品目录 → 3分钟生成多语种合规报价</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center" style={{minHeight: 320}}>
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-white mb-2">完整演示视频</h3>
            <p className="text-gray-400 text-sm mb-2 max-w-sm">从上传产品目录到AI自动决策语言、翻译、合规检查、生成报价，全程不到3分钟。</p>
            <a href="/playground" className="mt-4 px-6 py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-full hover:shadow-xl transition-all text-sm flex items-center gap-2 cursor-pointer no-underline">
              <span>🎬 观看AI自主工作演示</span>
            </a>
            <p className="text-xs text-gray-600 mt-3">需要演示环境？<button onClick={() => setShowForm(true)} className="text-[#00f0ff] hover:underline cursor-pointer bg-transparent border-none text-xs">预约演示 →</button></p>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white mb-3">快速体验 Quote Assistant</h3>
              <p className="text-sm text-gray-400 mb-4">输入产品信息 → 模拟AI多语种报价生成</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                  <span>智能折叠伞 3.0 | USD $12.50 FOB</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                  <span>190T 春亚纺 | 55cm*8K | 防风骨架</span>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 transition cursor-pointer">
                🚀 模拟生成报价
              </button>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-lg p-2"><div className="text-[10px] text-gray-500">🇩🇪 DE</div><div className="text-[10px] text-gray-400 mt-0.5">✓ CE</div></div>
                <div className="bg-white/5 rounded-lg p-2"><div className="text-[10px] text-gray-500">🇬🇧 EN</div><div className="text-[10px] text-gray-400 mt-0.5">✓ FDA</div></div>
                <div className="bg-white/5 rounded-lg p-2"><div className="text-[10px] text-gray-500">🇫🇷 FR</div><div className="text-[10px] text-gray-400 mt-0.5">✓ RGPD</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
<section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm tracking-widest">LIVE</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">NEXUS平台实时状态</h2>
          <p className="text-gray-400 mt-2">今日API调用 · 活跃Agent · 实时询盘</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#00f0ff]">{totalCalls}k</div>
            <div className="text-sm text-gray-500">今日API调用</div>
            <div className="text-[10px] text-green-400 mt-1">+15% vs 昨日</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{Math.floor(todayActive * 0.3)}/15</div>
            <div className="text-sm text-gray-500">活跃Agent</div>
            <div className="text-[10px] text-gray-500 mt-1">在线</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{todayActive + Math.floor(liveData * 0.5)}</div>
            <div className="text-sm text-gray-500">今日询盘</div>
            <div className="text-[10px] text-green-400 mt-1">+实时</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">0</div>
            <div className="text-sm text-gray-500">告警</div>
            <div className="text-[10px] text-green-400 mt-1">正常运行</div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <h4 className="text-sm text-gray-500 mb-3">最近活动</h4>
          <div className="space-y-1 text-sm">
            <div className="flex gap-4 text-gray-400 border-b border-white/5 py-1"><span className="text-[#00f0ff]">刚刚</span><span>Trade Engine 完成一轮巡检</span></div>
            <div className="flex gap-4 text-gray-400 border-b border-white/5 py-1"><span className="text-[#00f0ff]">2分钟前</span><span>AI诊断完成 - 某跨境企业</span></div>
            <div className="flex gap-4 text-gray-400 border-b border-white/5 py-1"><span className="text-[#00f0ff]">5分钟前</span><span>WorkBuddy 新合约部署</span></div>
            <div className="flex gap-4 text-gray-400 border-b border-white/5 py-1"><span className="text-[#00f0ff]">12分钟前</span><span>智能体巡检完成，0异常</span></div>
          </div>
          <a href="/platform.html" className="block mt-4 text-center text-[#00f0ff] text-sm hover:underline">进入运营管理平台 →</a>
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
                    {meta.tags.length > 0 && <div className="flex flex-wrap gap-1 mt-1.5">{meta.tags.map((t: string) => <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-500">{t}</span>)}</div>}
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
          <p className="text-gray-400 mt-2">按效果付费的真实效果</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <a key={i} href="/cases" className="block glass-strong rounded-2xl p-6 md:p-8 hover:neon-border transition-all duration-300 no-underline">
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
            </a>
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
              {s.title === "诊断" && <button onClick={() => { setDiagnoseOpen(true); setDiagnoseStep(0); setDiagnoseAnswers({}); }} className="mt-3 text-[11px] text-[#00f0ff] hover:underline cursor-pointer">开始诊断 →</button>}
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

      {/* ROI计算器 */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5" id="roi">
        <div className="text-center mb-10">
          <span className="text-[#00f0ff] text-sm tracking-widest">ROI</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">ROI计算器</h2>
          <p className="text-gray-400 mt-2">输入你的业务数据，看看NEXUS能带来多少增长</p>
        </div>
        <div className="max-w-2xl mx-auto glass rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">团队人数</label>
              <input type="number" id="roi-team" defaultValue="10" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">月均线索量</label>
              <input type="number" id="roi-leads" defaultValue="200" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">平均转化率(%)</label>
              <input type="number" id="roi-conv" defaultValue="5" step="0.1" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]" />
            </div>
          </div>
          <button onClick={() => {
            const team = parseInt((document.getElementById("roi-team") as HTMLInputElement)?.value || "10");
            const leads = parseInt((document.getElementById("roi-leads") as HTMLInputElement)?.value || "200");
            const conv = parseFloat((document.getElementById("roi-conv") as HTMLInputElement)?.value || "5");
            const r = calcROI(team, leads, conv / 100);
            document.getElementById("roi-result")!.innerHTML = `
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div class="bg-white/5 rounded-xl p-3"><div class="text-xs text-gray-500">当前年营收</div><div class="text-lg font-bold text-white mt-1">¥${(r.current/10000).toFixed(0)}万</div></div>
                <div class="bg-white/5 rounded-xl p-3"><div class="text-xs text-gray-500">使用后预估</div><div class="text-lg font-bold text-[#00f0ff] mt-1">¥${(r.projected/10000).toFixed(0)}万</div></div>
                <div class="bg-white/5 rounded-xl p-3"><div class="text-xs text-gray-500">NEXUS年费</div><div class="text-lg font-bold text-white mt-1">¥${(r.cost/10000).toFixed(0)}万</div></div>
                <div class="bg-white/5 rounded-xl p-3"><div class="text-xs text-gray-500">预计ROI</div><div class="text-lg font-bold text-green-400 mt-1">${r.roi}%</div></div>
              </div>
              <div class="mt-4 p-3 bg-green-400/10 border border-green-400/20 rounded-xl text-center">
                <span class="text-sm text-green-400 font-medium">预估年增收 ¥${((r.projected - r.current) / 10000).toFixed(0)}万 · ROI ${r.roi}%</span>
              </div>
            `;
          }} className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl transition text-sm cursor-pointer">
            计算ROI →
          </button>
          <div id="roi-result" className="mt-6"></div>
        </div>
      </section>


      {/* About */}
      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#00f0ff] text-sm tracking-widest">ABOUT</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">关于我们</h2>
          <p className="text-gray-400 mt-4 leading-relaxed text-sm">NEXUS 专注于AI Agent架构与商业落地，为出海企业提供全链路AI解决方案。</p>
          <div className="flex flex-wrap justify-center gap-8 mt-8"><div><div className="text-2xl font-bold text-[#00f0ff]">5+</div><div className="text-xs text-gray-500 mt-1">年AI经验</div></div><div><div className="text-2xl font-bold text-[#00f0ff]">15</div><div className="text-xs text-gray-500 mt-1">款产品</div></div><div><div className="text-2xl font-bold text-[#00f0ff]">2849</div><div className="text-xs text-gray-500 mt-1">服务企业</div></div></div>
        </div>
      </section>

      {/* GEO 健康度检测 + 自测工具 */}
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
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[82%] bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] rounded-full"></div></div>
                <span className="text-lg font-bold text-white">62</span><span className="text-xs text-gray-600">/100</span>
              </div>
            </div>
          </div>
         <div className="mt-4 text-center">
           <a href="/geo" className="text-xs text-gray-500 hover:text-[#00f0ff] transition">查看完整GEO优化报告 →</a>
         </div>
          {/* GEO自测入口 */}
          <div className="mt-8 text-center">
            <button onClick={() => {
              const g = document.getElementById("geo-quiz");
              if (g) { g.style.display = g.style.display === "none" ? "block" : "none"; }
            }} className="px-6 py-2.5 border border-[#00f0ff]/30 rounded-full text-[#00f0ff] text-sm hover:bg-[#00f0ff]/10 transition cursor-pointer">
              🧪 开始GEO自测
            </button>
          </div>
          <div id="geo-quiz" style={{display: "none"}} className="max-w-lg mx-auto mt-6 glass rounded-2xl p-6">
            <p className="text-sm text-gray-300 mb-4">5个问题，评估你的品牌AI可见度</p>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">你的品牌名称 *</label>
                <input id="geo-name" type="text" defaultValue="" className="w-full p-2.5 mt-1 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]" /></div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">你的网站是否有SSL/HTTPS？</label>
                <select id="geo-ssl" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-[#00f0ff]"><option value="yes">✅ 是</option><option value="no">❌ 否</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">网站是否有FAQ或问答模块？</label>
                <select id="geo-faq" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-[#00f0ff]"><option value="yes">✅ 有</option><option value="no">❌ 没有</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">是否定期更新内容（博客/案例）？</label>
                <select id="geo-content" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-[#00f0ff]"><option value="yes">✅ 定期更新</option><option value="sometimes">🔄 偶尔更新</option><option value="no">❌ 没有</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">已布局哪些AI平台？（可估算）</label>
                <select id="geo-platform" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-[#00f0ff]">
                  <option value="all">🌍 海内外3+平台</option><option value="domestic">🇨🇳 仅国内平台</option><option value="overseas">🌐 仅海外平台</option><option value="none">❌ 尚未开始</option>
                </select>
              </div>
              <button onClick={() => {
                const name = (document.getElementById("geo-name") as HTMLInputElement)?.value;
                if (!name) { alert("请输入品牌名称"); return; }
                let score = 0;
                const ssl = (document.getElementById("geo-ssl") as HTMLSelectElement)?.value;
                const faq = (document.getElementById("geo-faq") as HTMLSelectElement)?.value;
                const content = (document.getElementById("geo-content") as HTMLSelectElement)?.value;
                const platform = (document.getElementById("geo-platform") as HTMLSelectElement)?.value;
                if (ssl === "yes") score += 25;
                if (faq === "yes") score += 25;
                if (content === "yes") score += 25; else if (content === "sometimes") score += 10;
                if (platform === "all") score += 25; else if (platform === "domestic" || platform === "overseas") score += 15;
                const level = score >= 80 ? "优秀" : score >= 50 ? "良好" : "需提升";
                const color = score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
                document.getElementById("geo-result")!.innerHTML = `
                  <div class="mt-4 pt-4 border-t border-white/10 text-center">
                    <div class="text-sm text-gray-500">${name} · GEO可见度评分</div>
                    <div class="text-4xl font-bold ${color} mt-2">${score}/100</div>
                    <div class="text-sm ${color} mt-1 font-medium">${level}</div>
                    <div class="text-xs text-gray-500 mt-3 leading-relaxed">
                      ${score < 50 ? "建议从SSL部署+FAQ模块开始，优先覆盖2-3个AI平台" : score < 80 ? "基础不错，建议持续更新内容+扩展海外平台覆盖" : "你的品牌AI可见度较高，建议保持更新频率并监测引用趋势"}
                    </div>
                  </div>
                `;
              }} className="w-full py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl transition text-sm cursor-pointer mt-2">
                开始检测 →
              </button>
              <div id="geo-result"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 预约专家 - id for smooth scroll */}
      <section id="free-trial" className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#00f0ff] text-sm tracking-widest">BOOKING</span>
            <h3 className="text-2xl font-bold mt-2">预约专家咨询</h3>
            <p className="text-gray-400 text-sm mt-1">填写信息，2小时内获取专属AI方案</p>
          </div>
          <form onSubmit={handleBookingSubmit} className="glass rounded-2xl p-6">
            <input ref={bookingNameRef} type="text" placeholder="姓名 *" defaultValue=""
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input ref={bookingCompanyRef} type="text" placeholder="公司名称 *" defaultValue=""
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <input ref={bookingPhoneRef} type="text" placeholder="电话 / 微信 *" defaultValue=""
              className="w-full p-3 mb-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-sm" />
            <select ref={bookingProductRef} defaultValue=""
              className="w-full p-3 mb-4 bg-black/40 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-[#00f0ff] text-sm">
              <option value="">感兴趣的产品（选填）</option>
              {heroProducts.map(p => <option key={p.id} value={p.name}>{p.icon} {p.name}</option>)}
            </select>
            <button type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-all text-sm">
              预约专家咨询 →
            </button>
            {bookingStatus && <p className={"text-sm text-center mt-3 " + (bookingStatus.includes("✅") ? "text-green-400" : "text-red-400")}>{bookingStatus}</p>}
          </form>
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
        <a href="/platform.html" className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 no-underline">
          <div className="glass rounded-xl p-4 text-center hover:neon-border transition-all">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-xs font-semibold text-white">实时数据看板</div>
            <div className="text-[10px] text-gray-500 mt-1">今日询盘 23 · 响应率 31%</div>
            <div className="flex justify-center gap-2 mt-2 text-[10px]"><span className="text-green-400">↑12%</span><span className="text-gray-600">转化</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center hover:neon-border transition-all">
            <div className="text-2xl mb-1">🤖</div>
            <div className="text-xs font-semibold text-white">Agent 状态</div>
            <div className="text-[10px] text-gray-500 mt-1">15个智能体运行中</div>
            <div className="flex items-center justify-center gap-1 mt-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span><span className="text-[10px] text-green-400">0 异常</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center hover:neon-border transition-all">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-xs font-semibold text-white">巡检历史</div>
            <div className="text-[10px] text-gray-500 mt-1">近7天 · 12次巡检</div>
            <div className="flex justify-center gap-1 mt-2 text-[10px]"><span className="text-green-400">■■</span><span className="text-gray-600">■</span><span className="text-yellow-400">■</span><span className="text-green-400">■■</span><span className="text-green-400">■</span></div>
          </div>
          <div className="glass rounded-xl p-4 text-center hover:neon-border transition-all">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-semibold text-white">快捷操作</div>
            <div className="text-[10px] text-gray-500 mt-1">批量更新 · 导出报告</div>
            <div className="flex justify-center gap-2 mt-2"><span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-500">更新</span><span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-500">导出</span></div>
          </div>
        </a>
        <a href="/platform.html" className="block glass-strong rounded-2xl p-8 md:p-10 text-center hover:neon-border transition-all duration-300 no-underline">
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="text-2xl font-bold text-white">TradeV6 运营管理平台</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">买家管理 · 模板排名 · Agent状态 · 巡检历史 · 实时WebSocket看板</p>
          <span className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black rounded-full font-medium text-sm">
          进入运营平台 →
          </span>
          <p className="text-xs text-gray-500 mt-4">需要演示环境？<button onClick={() => setShowForm(true)} className="text-[#00f0ff] hover:underline cursor-pointer bg-transparent border-none text-xs">预约演示 →</button></p>
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-8 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">准备好AI转型了吗？</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-400">
                {isOnline ? "在线 · 立即咨询" : "离线 · 留言后联系"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">按结果付费 · 无效果不计费 · 全链路落地交付</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="px-6 py-3 bg-[#00f0ff] text-black rounded-full font-medium hover:shadow-lg hover:shadow-[#00f0ff]/20 transition-all cursor-pointer inline-block">
              按结果付费 · 立即咨询
            </a>
            <a href="/playground" className="px-5 py-3 border border-white/15 rounded-full text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm cursor-pointer no-underline">
              ⚡ 体验API/Skills
            </a>
            <a href="/geo" onClick={(e) => { e.preventDefault(); scrollTo("geo"); }} className="px-5 py-3 border border-white/15 rounded-full text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm cursor-pointer inline-block no-underline">
              🌐 GEO检测
            </a>
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
          <a href="/privacy.html" className="hover:text-gray-400 transition">📄 隐私政策</a>
        </div>
        <div className="text-xs text-gray-600">
          © 2026 NEXUS · 杭州云旅科技 · 按效果付费
        </div>
      </footer>

      {/* TrustBadges */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-center text-sm text-gray-500 mb-8 tracking-widest">资质与认证</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center group cursor-pointer" onClick={() => setSelectedBadge("AIP国标")}>
              <div className="text-2xl mb-1 transition-transform group-hover:scale-110">&#x1F6E1;&#xFE0F;</div>
              <div className="text-sm font-medium text-white group-hover:text-[#00f0ff] transition-colors">AIP国标</div>
              <div className="text-xs text-gray-500 hidden group-hover:block">AI安全治理平台认证</div>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => setSelectedBadge("等保三级")}>
              <div className="text-2xl mb-1 transition-transform group-hover:scale-110">&#x1F512;</div>
              <div className="text-sm font-medium text-white group-hover:text-[#00f0ff] transition-colors">等保三级</div>
              <div className="text-xs text-gray-500 hidden group-hover:block">国家信息安全等级保护</div>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => setSelectedBadge("GDPR/CCPA")}>
              <div className="text-2xl mb-1 transition-transform group-hover:scale-110">&#x1F30D;</div>
              <div className="text-sm font-medium text-white group-hover:text-[#00f0ff] transition-colors">GDPR/CCPA</div>
              <div className="text-xs text-gray-500 hidden group-hover:block">欧盟/加州数据合规</div>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => setSelectedBadge("FDA 510(k)")}>
              <div className="text-2xl mb-1 transition-transform group-hover:scale-110">&#x1F52C;</div>
              <div className="text-sm font-medium text-white group-hover:text-[#00f0ff] transition-colors">FDA 510(k)</div>
              <div className="text-xs text-gray-500 hidden group-hover:block">医疗器械合规中间件</div>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => setSelectedBadge("国家高新技术企业")}>
              <div className="text-2xl mb-1 transition-transform group-hover:scale-110">&#x1F3E2;</div>
              <div className="text-sm font-medium text-white group-hover:text-[#00f0ff] transition-colors">国家高新技术企业</div>
              <div className="text-xs text-gray-500 hidden group-hover:block">国家级科技企业认定</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Standard */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <span className="text-[#00f0ff] text-sm tracking-widest">NEXUS STANDARD</span>
          <h2 className="text-3xl font-bold mt-2 mb-6">AI落地必须&#x300C;按结果付费&#x300D;</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            我们倡议：AI项目应以结果为导向，未达目标不收费。这是对客户负责，也是对行业健康的承诺。
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/diagnose" className="glass rounded-xl px-6 py-4 block hover:neon-border transition-all group no-underline">
              <div className="text-[#00f0ff] font-bold group-hover:text-white transition-colors">L1-L5</div>
              <div className="text-gray-500 group-hover:text-gray-300 transition-colors">AI成熟度模型</div>
            </a>
            <a href="/cases" className="glass rounded-xl px-6 py-4 block hover:neon-border transition-all group no-underline">
              <div className="text-[#00f0ff] font-bold group-hover:text-white transition-colors">2849+</div>
              <div className="text-gray-500 group-hover:text-gray-300 transition-colors">已服务企业</div>
            </a>
            <a href="/products" className="glass rounded-xl px-6 py-4 block hover:neon-border transition-all group no-underline">
              <div className="text-[#00f0ff] font-bold group-hover:text-white transition-colors">15款</div>
              <div className="text-gray-500 group-hover:text-gray-300 transition-colors">可运营产品</div>
            </a>
          </div>
          <button onClick={() => setShowForm(true)} className="inline-block mt-8 text-[#00f0ff] hover:underline cursor-pointer bg-transparent border-none">下载《企业AI落地白皮书》 &#x2192;</button>
        </div>
      </section>

      {/* Badge detail modal */}
      {selectedBadge && badgeDetails[selectedBadge] && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedBadge(null)}>
          <div className="bg-[#1a1a2e]/95 backdrop-blur-xl border border-[#00f0ff]/30 rounded-2xl p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-lg">&#x2715;</button>
            <div className="text-4xl mb-4">{badgeDetails[selectedBadge]?.icon || "&#x1F3C6;"}</div>
            <h3 className="text-2xl font-bold mb-2">{selectedBadge}</h3>
            <p className="text-sm text-[#00f0ff] mb-4">{badgeDetails[selectedBadge]?.desc}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{badgeDetails[selectedBadge]?.detail}</p>
            <button onClick={() => { setSelectedBadge(null); setShowForm(true); }} className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl transition-all text-sm">对此认证感兴趣？立即咨询</button>
          </div>
        </div>
      )}

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

      {/* 3步诊断 Modal */}
      {diagnoseOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-lg w-full relative">
            <button onClick={() => { setDiagnoseOpen(false); setDiagnoseStep(0); setDiagnoseAnswers({}); }} className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-lg">✕</button>
            <h3 className="text-2xl font-bold mb-1">3步找到你的AI产品</h3>
            <p className="text-gray-400 text-sm mb-6">3个问题，精准匹配最适合你的方案</p>
            {diagnoseStep < 3 ? (
              <>
                <div className="flex gap-2 mb-6">
                  {diagnoseQuestions.map((_, i) => (
                    <div key={i} className={"h-1 flex-1 rounded-full transition-all " + (i <= diagnoseStep ? "bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe]" : "bg-white/10")} />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-1">{diagnoseQuestions[diagnoseStep].text}</p>
                <div className="space-y-2 mb-6">
                  {diagnoseQuestions[diagnoseStep].options.map((opt) => {
                    const selected = diagnoseAnswers[diagnoseQuestions[diagnoseStep].id] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => setDiagnoseAnswers((a) => ({ ...a, [diagnoseQuestions[diagnoseStep].id]: opt.value }))}
                        className={"w-full p-3 rounded-xl text-sm text-left transition-all cursor-pointer " + (selected ? "bg-gradient-to-r from-[#00f0ff]/20 to-[#7b2fbe]/20 border border-[#00f0ff]/30" : "bg-white/5 border border-white/10 hover:border-white/30")}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  {diagnoseStep > 0 && <button onClick={() => setDiagnoseStep((s) => s - 1)} className="flex-1 py-3 border border-white/15 rounded-xl text-gray-400 hover:bg-white/5 transition cursor-pointer text-sm">上一步</button>}
                  <button onClick={() => { if (diagnoseAnswers[diagnoseQuestions[diagnoseStep].id]) setDiagnoseStep((s) => s + 1); }} disabled={!diagnoseAnswers[diagnoseQuestions[diagnoseStep].id]}
                    className={"flex-1 py-3 rounded-xl font-medium transition text-sm cursor-pointer " + (diagnoseAnswers[diagnoseQuestions[diagnoseStep].id] ? "bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black" : "bg-white/10 text-gray-600")}>下一步 →</button>
                </div>
              </>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-gray-400 text-sm">根据你的回答，为你推荐以下方案</p>
                </div>
                {getMatchedProducts().map((p) => (
                  <a key={p.id} href={"/product_detail.html?id=" + p.id} className="block glass rounded-xl p-4 mb-3 hover:neon-border transition-all no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{p.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                        <div className="text-xs text-[#00f0ff] mt-1">{p.price}</div>
                      </div>
                    </div>
                  </a>
                ))}
                <button onClick={() => { setDiagnoseOpen(false); setShowForm(true); }} className="w-full mt-4 py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black font-semibold rounded-xl hover:shadow-xl transition text-sm cursor-pointer">
                  预约专家咨询 →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
        {/* 产品对比栏 */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/10 p-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex gap-2 flex-wrap">
                {compareList.map((id) => {
                  const p = heroProducts.find((x) => x.id === id);
                  return p ? <span key={id} className="text-xs px-3 py-1 bg-white/10 rounded-full text-white">{p.icon} {p.name} <button onClick={() => toggleCompare(id)} className="ml-1 text-gray-500 hover:text-white">✕</button></span> : null;
                })}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setCompareList([])} className="px-3 py-1.5 border border-white/15 rounded-lg text-xs text-gray-400 hover:bg-white/5 cursor-pointer">清空</button>
                {compareList.length >= 2 && (
                  <button onClick={() => setShowCompare(true)} className="px-4 py-1.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2fbe] text-black rounded-lg text-xs font-semibold cursor-pointer">对比 {compareList.length} 款产品</button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 产品对比 Modal */}
        {showCompare && compareList.length >= 2 && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-4xl w-full relative max-h-[85vh] overflow-auto">
              <button onClick={() => setShowCompare(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-lg">✕</button>
              <h3 className="text-xl font-bold mb-6">产品对比</h3>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-gray-500 font-medium w-28">对比项</th>
                      {compareList.map((id) => {
                        const p = heroProducts.find((x) => x.id === id);
                        return <th key={id} className="text-left py-3 px-3 font-semibold text-white">{p?.icon} {p?.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {[["价格", "price"], ["分类", "cat"], ["描述", "desc"]].map(([label, key]) => (
                      <tr key={key} className="border-b border-white/5">
                        <td className="py-3 pr-4 text-gray-500 text-xs">{label}</td>
                        {compareList.map((id) => {
                          const p = heroProducts.find((x) => x.id === id);
                          return <td key={id} className="py-3 px-3 text-gray-300 text-xs">{p?.[key as keyof typeof p]?.toString() || "-"}</td>;
                        })}
                      </tr>
                    ))}
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 text-gray-500 text-xs">ROI</td>
                      {compareList.map((id) => {
                        const m = (productMeta as any)[id];
                        return <td key={id} className="py-3 px-3 text-green-400 text-xs font-medium">{m?.roi || "-"}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-500 text-xs">操作</td>
                      {compareList.map((id) => (
                        <td key={id} className="py-3 px-3"><a href={"/product_detail.html?id=" + id} className="text-[#00f0ff] text-xs hover:underline">查看详情 →</a></td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}
