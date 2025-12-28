'use client';

import { useState } from 'react';

interface FlashcardProps {
    arabic: string;
    translation: string;
    category: string;
    root: string;
    onCorrect: () => void;
    onIncorrect: () => void;
}

export default function Flashcard({
    arabic,
    translation,
    category,
    root,
    onCorrect,
    onIncorrect,
}: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const categoryLabels: Record<string, { label: string; color: string }> = {
        ism: { label: 'اِسْم', color: 'bg-blue-500' },
        fiil: { label: 'فِعْل', color: 'bg-green-500' },
        harf: { label: 'حَرْف', color: 'bg-amber-500' },
    };

    const categoryInfo = categoryLabels[category] || { label: category, color: 'bg-gray-500' };

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Card */}
            <div
                className={`flip-card w-full aspect-[3/4] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="flip-card-inner w-full h-full relative">
                    {/* Front */}
                    <div className="flip-card-front absolute inset-0 card p-6 flex flex-col items-center justify-center">
                        {/* Category Badge */}
                        <span className={`${categoryInfo.color} px-3 py-1 rounded-full text-sm font-arabic mb-6`}>
                            {categoryInfo.label}
                        </span>

                        {/* Arabic Word */}
                        <h2 className="text-5xl font-arabic text-white mb-4">
                            {arabic}
                        </h2>

                        {/* Hint */}
                        <p className="text-muted text-sm mt-auto">
                            Tap untuk lihat jawaban
                        </p>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back absolute inset-0 card p-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
                        {/* Arabic Word (smaller) */}
                        <h2 className="text-3xl font-arabic text-white mb-4">
                            {arabic}
                        </h2>

                        {/* Translation */}
                        <div className="text-center mb-4">
                            <p className="text-lg text-muted mb-1">Terjemah:</p>
                            <p className="text-2xl font-bold text-white">{translation}</p>
                        </div>

                        {/* Root */}
                        {root !== '-' && (
                            <div className="text-center mb-4">
                                <p className="text-sm text-muted mb-1">Akar kata:</p>
                                <p className="text-xl font-arabic text-secondary">{root}</p>
                            </div>
                        )}

                        {/* Hint */}
                        <p className="text-muted text-sm mt-auto">
                            Tap untuk kembali
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {isFlipped && (
                <div className="flex gap-4 mt-6 animate-fade-in">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onIncorrect();
                            setIsFlipped(false);
                        }}
                        className="flex-1 py-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-medium active:scale-95 transition-transform"
                    >
                        ❌ Belum Hafal
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCorrect();
                            setIsFlipped(false);
                        }}
                        className="flex-1 py-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 font-medium active:scale-95 transition-transform"
                    >
                        ✅ Sudah Hafal
                    </button>
                </div>
            )}
        </div>
    );
}
