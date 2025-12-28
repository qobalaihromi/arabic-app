'use client';

import { useState } from 'react';
import kitabData from '@/data/safinatun-najah.json';
import WordDetail from '@/components/WordDetail';
import { useAppStore } from '@/store/useAppStore';

interface Word {
    word_id: string;
    arabic: string;
    arabic_plain: string;
    translation: string;
    root: string;
    category: string;
    subcategory: string;
    irab: {
        position: string;
        position_id: string;
        case: string;
        case_id: string;
        sign: string;
        sign_id: string;
        explanation: string;
    };
}

export default function KitabPage() {
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const { showHarakat, toggleHarakat, markParagraphRead, addXP, updateStreak } = useAppStore();

    const chapters = kitabData.chapters;
    const currentChapter = chapters[selectedChapter];

    const handleWordClick = (word: Word, paragraphId: string) => {
        setSelectedWord(word);
        markParagraphRead(currentChapter.chapter_id, paragraphId);
        addXP(5);
        updateStreak();
    };

    return (
        <div className="px-4 py-6">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-arabic text-white mb-1">
                    {kitabData.kitab_name}
                </h1>
                <p className="text-muted text-sm">{kitabData.kitab_name_id}</p>
            </div>

            {/* Chapter Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
                {chapters.map((chapter, index) => (
                    <button
                        key={chapter.chapter_id}
                        onClick={() => setSelectedChapter(index)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${selectedChapter === index
                                ? 'bg-primary text-white'
                                : 'bg-card text-muted border border-border'
                            }`}
                    >
                        Bab {chapter.chapter_id}
                    </button>
                ))}
            </div>

            {/* Chapter Title */}
            <div className="card p-4 mb-4">
                <h2 className="text-xl font-arabic text-white text-center mb-1">
                    {currentChapter.chapter_title}
                </h2>
                <p className="text-muted text-sm text-center">
                    {currentChapter.chapter_title_id}
                </p>
            </div>

            {/* Harakat Toggle */}
            <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-muted text-sm">Tampilkan Harakat</span>
                <button
                    onClick={toggleHarakat}
                    className={`w-14 h-8 rounded-full transition-all ${showHarakat ? 'bg-primary' : 'bg-gray-600'
                        }`}
                >
                    <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${showHarakat ? 'translate-x-7' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
                {currentChapter.paragraphs.map((paragraph) => (
                    <div key={paragraph.paragraph_id} className="card p-5">
                        {/* Arabic Text */}
                        <div className="text-2xl font-arabic leading-loose text-white mb-4 flex flex-wrap justify-end gap-x-2">
                            {paragraph.words.map((word) => (
                                <button
                                    key={word.word_id}
                                    onClick={() => handleWordClick(word, paragraph.paragraph_id)}
                                    className="hover:text-primary active:text-primary transition-colors underline-offset-4 hover:underline"
                                >
                                    {showHarakat ? word.arabic : word.arabic_plain}
                                </button>
                            ))}
                        </div>

                        {/* Translation */}
                        <div className="pt-3 border-t border-border">
                            <p className="text-muted text-sm">
                                {paragraph.translation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Word Detail Modal */}
            {selectedWord && (
                <WordDetail
                    word={selectedWord}
                    onClose={() => setSelectedWord(null)}
                />
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <p className="text-sm text-blue-300">
                    💡 <strong>Tips:</strong> Tap pada setiap kata untuk melihat terjemah dan i&apos;rabnya.
                    Toggle harakat untuk latihan membaca teks gundul.
                </p>
            </div>
        </div>
    );
}
