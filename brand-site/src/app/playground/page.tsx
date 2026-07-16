'use client';
import { useState } from 'react';

const SKILLS = [
  { id: 'prospector', label: 'Prospector 拓客', fields: ['industry', 'region', 'keywords'] },
  { id: 'analyzer', label: 'Analyzer 分析', fields: ['customer_id', 'behavior_data'] },
  { id: 'outreach', label: 'Outreach 触达', fields: ['channel', 'template_id'] },
  { id: 'content', label: 'Content 内容', fields: ['topic', 'format', 'platform'] },
];

export default function PlaygroundPage() {
  const [selectedSkill, setSelectedSkill] = useState('prospector');
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setResponse({ status: 'success', result: { leads: [{ company: 'XX科技', score: 92 }, { company: 'YY制造', score: 85 }, { company: 'ZZ贸易', score: 78 }], total: 47 } });
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 max-w-5xl mx-auto px-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-2">API Playground</h1>
      <p className="text-gray-400 mb-8">在线体验AI Agent能力</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm text-gray-500 mb-4">选择Skill</h3>
          <div className="space-y-2">{SKILLS.map(s => (
            <button key={s.id} onClick={() => setSelectedSkill(s.id)}
              className={"w-full text-left px-4 py-2 rounded-lg transition-colors " + (selectedSkill === s.id ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'hover:bg-white/5 text-gray-400')}>{s.label}</button>
          ))}</div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm text-gray-500 mb-4">请求参数</h3>
            {SKILLS.find(s => s.id === selectedSkill)?.fields.map(f => (
              <input key={f} type="text" placeholder={f} onChange={e => setParams({...params, [f]: e.target.value})}
                className="w-full mb-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] outline-none" />
            ))}
            <button onClick={handleSend} disabled={loading}
              className="w-full bg-[#00f0ff] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00f0ff]/80 disabled:opacity-50">{loading ? '发送中...' : '发送请求'}</button>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm text-gray-500 mb-4">响应结果</h3>
            <pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-auto max-h-64">
              {response ? JSON.stringify(response, null, 2) : '等待请求...'}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}