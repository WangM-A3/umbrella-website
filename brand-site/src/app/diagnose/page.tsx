'use client';
import { useState } from 'react';
import Link from 'next/link';

const STEPS = [
  { id: 'pain', question: '您目前最想解决的问题是？', options: [
    { value: 'lead', label: '获客难', icon: '🎯' },
    { value: 'compliance', label: '合规压力大', icon: '🛡️' },
    { value: 'content', label: '内容生产慢', icon: '📝' },
    { value: 'integration', label: '系统集成复杂', icon: '🔗' },
  ]},
  { id: 'scale', question: '您的企业规模？', options: [
    { value: 'startup', label: '初创（<50人）' },
    { value: 'growth', label: '成长（50-500人）' },
    { value: 'enterprise', label: '集团（>500人）' },
  ]},
  { id: 'urgency', question: '您期望的见效时间？', options: [
    { value: '1week', label: '1周内' },
    { value: '1month', label: '1个月内' },
    { value: '3months', label: '3个月+' },
  ]},
];

export default function DiagnosePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (stepId: string, value: string) => {
    setAnswers({ ...answers, [stepId]: value });
    if (step < STEPS.length - 1) { setStep(step + 1); }
    else { generateResult(); }
  };

  const generateResult = async () => {
    setLoading(true);
    await new Promise((r: any) => setTimeout(r, 1500));
    setResult({ recommendations: [
      { name: 'Trade Engine 外贸引擎', match: 95, reason: '外贸获客最佳方案' },
      { name: 'Agent Skills API', match: 88, reason: '自动化客户开发' },
      { name: 'WorkBuddy', match: 82, reason: '提升团队效率' },
    ]});
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-8 bg-black text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">3步找到你的AI落地方案</h1>
        <p className="text-gray-400">回答3个问题，获取专属AI转型建议</p>
      </div>
      <div className="flex gap-2 mb-12">
        {STEPS.map((s, i) => (<div key={s.id} className={"flex-1 h-1 rounded-full " + (i <= step ? "bg-[#00f0ff]" : "bg-white/10")} />))}
      </div>
      {!result && !loading && (
        <div className="glass rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-bold mb-6">{STEPS[step].question}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {STEPS[step].options.map(opt => (
              <button key={opt.value} onClick={() => handleSelect(STEPS[step].id, opt.value)}
                className="p-4 rounded-xl border border-white/10 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all text-left">
                {opt.icon && <span className="text-2xl mr-3">{opt.icon}</span>}{opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {loading && <div className="text-center py-12"><div className="animate-spin w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full mx-auto mb-4" /><p className="text-gray-400">正在生成您的专属方案...</p></div>}
      {result && (
        <div className="glass rounded-2xl p-8 border border-[#00f0ff]/30">
          <div className="text-center mb-8"><span className="text-4xl">🎉</span><h2 className="text-2xl font-bold mt-2">您的专属方案已生成</h2></div>
          <div className="space-y-4">
            {result.recommendations.map((rec: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div><div className="font-medium text-white">{rec.name}</div><div className="text-sm text-gray-400">{rec.reason}</div></div>
                <div className="text-[#00f0ff] font-bold">{rec.match}%</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <Link href="/booking" className="flex-1 text-center bg-[#00f0ff] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#00f0ff]/80">预约专家解读</Link>
            <button onClick={() => { setStep(0); setAnswers({}); setResult(null); }} className="flex-1 text-center border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5">重新诊断</button>
          </div>
        </div>
      )}
    </main>
  );
}