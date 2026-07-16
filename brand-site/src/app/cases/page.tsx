"use client";

export default function CasesPage() {
  const cases = [
    { slug: "hardware-tools", title: "浙江某五金工具厂：3个月获取27个有效询盘", industry: "制造业", summary: "通过AI精准拓客，签约2个北美经销商", roi: 8, products: ["Prospector", "Analyzer"] },
    { slug: "yiwu-trader", title: "义乌小商品贸易商：谷歌自然流量+340%", industry: "跨境电商", summary: "AI生成多语言Listing，覆盖全球市场", roi: 12, products: ["Outreach", "Content Engine"] },
    { slug: "brand-retail", title: "某品牌零售商：AI客服降低60%成本", industry: "品牌零售", summary: "智能体代替30人客服团队，响应速度提升5倍", roi: 6, products: ["WorkBuddy", "AI-OS"] },
  ];

  return (
    <main className="min-h-screen bg-[#0a0e27] text-white pt-32 pb-20 max-w-6xl mx-auto px-8">
      <h1 className="text-4xl font-bold mb-4">成功案例</h1>
      <p className="text-gray-400 mb-12">按结果付费的真实效果</p>

      <div className="grid md:grid-cols-2 gap-6">
        {cases.map(c => (
          <a key={c.slug} href={`/cases/${c.slug}`} className="glass rounded-2xl overflow-hidden hover:neon-border transition-all duration-300 group no-underline">
            <div className="h-48 bg-gradient-to-br from-[#00f0ff]/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-6xl opacity-30">📊</span>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded">{c.industry}</span>
                <span className="text-xs px-2 py-1 bg-green-400/10 text-green-400 rounded">ROI {c.roi}x</span>
              </div>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.summary}</p>
              <div className="mt-4 flex gap-2">
                {c.products.map(p => <span key={p} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{p}</span>)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
