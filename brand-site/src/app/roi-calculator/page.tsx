'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ROICalculatorPage() {
  const [result, setResult] = useState<any>(null);
  const calculate = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setResult({ roi: '8.5x', paybackMonths: '2.3', revenueIncrease: '340', costReduction: '60' });
  };

  return (
    <main className="min-h-screen pt-32 pb-20 max-w-4xl mx-auto px-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-2">ROI计算器</h1>
      <p className="text-gray-400 mb-8">输入业务数据，计算AI转型的投资回报</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
          <div><label className="text-sm text-gray-400">行业</label>
            <select className="w-full mt-1 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white">
              <option>制造业</option><option>跨境电商</option><option>品牌零售</option>
            </select></div>
          <div><label className="text-sm text-gray-400">年营收（万元）</label>
            <input type="range" min="500" max="50000" className="w-full" /></div>
          <div><label className="text-sm text-gray-400">团队人数</label>
            <input type="number" className="w-full mt-1 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white" placeholder="50" /></div>
          <button onClick={calculate} className="w-full bg-[#00f0ff] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00f0ff]/80">计算ROI</button>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          {result ? (<>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-400/5 rounded-xl"><div className="text-3xl font-bold text-green-400">{result.roi}</div><div className="text-sm text-gray-500">投资回报率</div></div>
              <div className="text-center p-4 bg-[#00f0ff]/5 rounded-xl"><div className="text-3xl font-bold text-[#00f0ff]">{result.paybackMonths}月</div><div className="text-sm text-gray-500">回本周期</div></div>
              <div className="text-center p-4 bg-purple-400/5 rounded-xl"><div className="text-3xl font-bold text-purple-400">+{result.revenueIncrease}%</div><div className="text-sm text-gray-500">预计增收</div></div>
              <div className="text-center p-4 bg-orange-400/5 rounded-xl"><div className="text-3xl font-bold text-orange-400">-{result.costReduction}%</div><div className="text-sm text-gray-500">成本降低</div></div>
            </div>
            <Link href="/booking" className="block mt-6 text-center bg-[#00f0ff] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00f0ff]/80">获取完整报告 →</Link>
          </>) : (
            <div className="text-center text-gray-400 mt-12"><span className="text-4xl block mb-4">📊</span><p>填写左侧数据，查看您的ROI预测</p></div>
          )}
        </div>
      </div>
    </main>
  );
}