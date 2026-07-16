"use client";

import { notFound, useParams } from "next/navigation";

const caseData = {
  "hardware-tools": {
    title: "浙江某五金工具厂：3个月获取27个有效询盘",
    industry: "制造业",
    products: ["Prospector", "Analyzer"],
    challenge: "传统外贸依赖展会，获客成本高，2024年参展费用超30万元，仅获取5个有效询盘。",
    solution: "部署AI Prospector进行全球买家智能匹配，Analyzer自动评分高价值线索。",
    results: [
      { metric: "有效询盘", value: "27", change: "+440%" },
      { metric: "签约客户", value: "2", change: "北美经销商" },
      { metric: "获客成本", value: "-70%", change: "大幅降低" },
      { metric: "响应时间", value: "3min", change: "提升20倍" },
    ],
    testimonial: { quote: "AI让我们的外贸拓客从'大海捞针'变成了'精准打击'。", author: "王总", title: "企业创始人" },
    roi: 8, timeline: "3个月"
  },
  "yiwu-trader": {
    title: "义乌小商品贸易商：谷歌自然流量+340%",
    industry: "跨境电商",
    products: ["Outreach", "Content Engine"],
    challenge: "1500+ SKU需要多语言Listing，人工翻译效率低、成本高，谷歌排名长期低迷。",
    solution: "AI批量生成多语言产品描述，智能优化SEO关键词，自动投放多平台。",
    results: [
      { metric: "自然流量", value: "+340%", change: "谷歌搜索" },
      { metric: "询盘量", value: "89/月", change: "提升5倍" },
      { metric: "内容产出", value: "1500+", change: "多语言SKU" },
      { metric: "ROI", value: "12x", change: "3个月回本" },
    ],
    testimonial: { quote: "以前一个运营管3个平台，现在AI管30个。", author: "陈总", title: "运营总监" },
    roi: 12, timeline: "2个月"
  },
  "brand-retail": {
    title: "某品牌零售商：AI客服降低60%成本",
    industry: "品牌零售",
    products: ["WorkBuddy", "AI-OS"],
    challenge: "30人客服团队月处理2万+咨询，响应慢、人员流动大、培训成本高。",
    solution: "WorkBuddy智能体代替80%常规咨询，复杂问题自动升级人工。",
    results: [
      { metric: "客服成本", value: "-60%", change: "大幅降低" },
      { metric: "响应时间", value: "3秒", change: "提升40倍" },
      { metric: "满意度", value: "92%", change: "+15%" },
      { metric: "升级率", value: "15%", change: "仅复杂问题" },
    ],
    testimonial: { quote: "客户根本分不清是AI还是人，但响应速度快了40倍。", author: "李总", title: "客服VP" },
    roi: 6, timeline: "2个月"
  }
};

export default function CaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const data = caseData[slug as keyof typeof caseData];

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-[#0a0e27] text-white pt-32 pb-20 max-w-4xl mx-auto px-8">
      <nav className="text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-white transition-colors">首页</a>
        <span className="mx-2">›</span>
        <a href="/cases" className="hover:text-white transition-colors">案例</a>
        <span className="mx-2">›</span>
        <span className="text-white">{data.title}</span>
      </nav>

      <div className="mb-12">
        <div className="flex gap-2 mb-4">
          <span className="text-xs px-3 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded-full">{data.industry}</span>
          {data.products.map(p => (
            <span key={p} className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full">{p}</span>
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-400 text-lg">ROI {data.roi}x · 实施周期 {data.timeline}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-[#00f0ff] text-sm font-medium mb-2">💡 核心痛点</h3>
          <p className="text-gray-300">{data.challenge}</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-[#00f0ff] text-sm font-medium mb-2">🚀 解决方案</h3>
          <p className="text-gray-300">{data.solution}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 mb-12">
        <h3 className="text-xl font-bold mb-6">📊 关键数据</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.results.map((r, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-[#00f0ff]">{r.value}</div>
              <div className="text-sm text-gray-500">{r.metric}</div>
              <div className="text-xs text-green-400">{r.change}</div>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="border-l-4 border-[#00f0ff] pl-6 py-4 mb-12">
        <p className="text-xl text-gray-300 italic">&#x201C;{data.testimonial.quote}&#x201D;</p>
        <footer className="mt-2 text-sm text-gray-500">&#x2014; {data.testimonial.author}，{data.testimonial.title}</footer>
      </blockquote>

      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">想获取同行业的AI落地方案？</p>
        <a href="/booking" className="inline-block bg-[#00f0ff] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#00f0ff]/80 transition-colors no-underline">
          立即咨询 &#x2192;
        </a>
      </div>
    </main>
  );
}
