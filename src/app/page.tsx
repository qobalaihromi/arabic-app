'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          بِسْمِ اللَّهِ
        </h1>
        <p className="text-muted">
          Selamat datang di Kitab Reader
        </p>
      </div>

      {/* Stats Card */}
      <div className="card p-4 mb-6">
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted">Hari Streak</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">0</p>
            <p className="text-sm text-muted">Total XP</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">0</p>
            <p className="text-sm text-muted">Kata Hafal</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-white mb-4">Mulai Belajar</h2>

      <div className="space-y-3">
        {/* Flashcard */}
        <Link href="/flashcard">
          <div className="card card-hover p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl">
              📇
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Flashcard Kosakata</h3>
              <p className="text-sm text-muted">Hafal kosakata Ism, Fi&apos;il, Harf</p>
            </div>
            <span className="text-muted">→</span>
          </div>
        </Link>

        {/* Kitab */}
        <Link href="/kitab">
          <div className="card card-hover p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl">
              📖
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Baca Kitab Interaktif</h3>
              <p className="text-sm text-muted">Safinatun Najah dengan I&apos;rab</p>
            </div>
            <span className="text-muted">→</span>
          </div>
        </Link>

        {/* Materi */}
        <Link href="/materi">
          <div className="card card-hover p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl">
              📚
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Materi Nahwu Sharaf</h3>
              <p className="text-sm text-muted">Pelajari dasar-dasar grammar Arab</p>
            </div>
            <span className="text-muted">→</span>
          </div>
        </Link>
      </div>

      {/* Daily Goal */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Target Harian</h2>
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white">Kosakata</span>
            <span className="text-muted">0/10</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-0" />
          </div>

          <div className="flex justify-between items-center mb-3 mt-4">
            <span className="text-white">Baca Kitab</span>
            <span className="text-muted">0/1 paragraf</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full w-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
