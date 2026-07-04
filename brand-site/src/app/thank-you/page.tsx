"use client";

import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-4xl mb-6 shadow-[0_0_60px_rgba(0,212,255,0.2)]">
          ✓
        </div>
        <h1 className="font-orbitron text-3xl font-bold mb-3">
          消息已发送<span className="text-cyan-400">!</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          感谢你的来信，我会在 24 小时内回复你。
          <br />
          期待与你一起构建未来。
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-medium hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
