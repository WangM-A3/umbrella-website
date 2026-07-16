'use client';
import { useState } from 'react';

export default function GEOPage() {
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkGEO = async () => {
    setLoading(true);
    await new Promise((r: any) => setTimeout(r, 1500));
    setResult({
      score: 72,
      platforms: [
        { name: '豆包', status: 'recognized' },
        { name: 'DeepSeek', status: 'recognized' },
        { name: 'Kimi', status: 'optimizing' },
        { name: 'ChatGPT', status: 'optimizing' },
        { name: 'Perplexity', status: 'recognized' },
      ],
      recommendations: ['优化官网品牌描述一致性', '增加行业案例和FAQ内容', '在AI平台提交品牌信息']
    });
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 max-w-4xl mx-auto px-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-2">品牌AI可见度检测</h1>
      <p className="text-gray-400 mb-8">检测您的品牌在各大AI平台的可见度</p>
      <div className="flex gap-4 mb-8">
        <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="输入您的品牌名称"
          className="flex-1 px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] outline-none" />
        <button onClick={checkGEO} disabled={loading}
          className="bg-[#00f0ff] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#00f0ff]/80 disabled:opacity-50">
          {loading ? '检测中...' : '检测'}</button>
      </div>
      {result && (<div className="space-y-6">
        <div className="glass rounded-2xl p-6 text-center border border-white/10">
          <div className="text-6xl font-bold text-[#00f0ff] mb-2">{result.score}/100</div>
          <p className="text-gray-400">综合可见度评分</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">{result.platforms.map((p: any) => (
          <div key={p.name} className="glass rounded-xl p-4 flex items-center justify-between border border-white/5">
            <span className="font-medium">{p.name}</span>
            <span className={"px-3 py-1 rounded-full text-xs " + (p.status === 'recognized' ? 'bg-green-400/20 text-green-400' : p.status === 'optimizing' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400')}>
              {p.status === 'recognized' ? '✓ 可识别' : p.status === 'optimizing' ? '○ 待优化' : '— 待检测'}
            </span>
          </div>
        ))}</div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h3 className="font-bold mb-4">优化建议</h3>
          <ul className="space-y-2">{result.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm"><span className="text-[#00f0ff]">›</span>{r}</li>
          ))}</ul>
        </div>
      </div>)}
    </main>
  );
}