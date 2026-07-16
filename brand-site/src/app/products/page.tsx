import Link from 'next/link';

const products = [
  { id: 'trade-engine', name: 'Trade Engine', category: '外贸核心', price: '¥50-500万/年', desc: '全链路AI外贸决策OS' },
  { id: 'agent-skills', name: 'Agent Skills API', category: '外贸核心', price: '按需·API调用', desc: '4个独立AI能力' },
  { id: 'v6-security', name: 'V6.0 AI安全治理', category: '合规安全', price: '¥30-300万/年', desc: '8大算法×5层防御' },
  { id: 'boss-ip', name: 'BOSS IP Factory', category: '内容创意', price: '¥10-30万/年', desc: '15分钟录制AI出视频' },
  { id: 'platform-kernel', name: 'Platform Kernel', category: '平台基础设施', price: '¥50-200万/年', desc: 'Agent编排+语义层' },
  { id: 'workbuddy', name: 'WorkBuddy', category: '企业AI辅助', price: '¥3-15万/年', desc: '企业AI办公助手' },
  { id: 'ai-os', name: 'AI-OS', category: '行业方案', price: '¥5-500万', desc: '5层决策闭环' },
  { id: 'short-drama', name: 'AI短剧制作', category: '内容创意', price: '¥3-20万/项目', desc: 'AI驱动的短剧全流程' },
  { id: 'compliance-middle', name: '合规中间件', category: '合规安全', price: '¥20-80万/年', desc: 'FDA 510(k)等监管合规' },
  { id: 'cross-border', name: '跨境数据合规', category: '合规安全', price: '¥10-40万/年', desc: 'GDPR·CCPA·跨境数据' },
  { id: 'solution-gen', name: 'AI Solution Gen', category: '行业方案', price: '¥3-10万/次', desc: '5个Agent自动生成方案' },
  { id: 'scifi-pick', name: '科幻IP选品', category: '内容创意', price: '¥2-5万/月', desc: 'Reddit挖掘+AI分析' },
];

const categories = ['全部', '外贸核心', '合规安全', '内容创意', '平台基础设施', '企业AI辅助', '行业方案'];

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 max-w-6xl mx-auto px-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-2">AI产品家族</h1>
      <p className="text-gray-400 mb-8">15款可运营产品，覆盖全链路AI需求</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button key={cat} className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 hover:text-white transition-colors">{cat}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => (
          <Link key={p.id} href={"/product_detail.html?id=" + p.id} className="glass rounded-2xl p-6 border border-white/5 hover:border-[#00f0ff]/30 transition-all hover:-translate-y-1 no-underline block">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded">{p.category}</span>
              <span className="text-xs text-gray-500">{p.price}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
            <p className="text-sm text-gray-400">{p.desc}</p>
            <div className="mt-4 text-[#00f0ff] text-sm">查看详情 →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}