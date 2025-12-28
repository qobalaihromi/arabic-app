'use client';

import { useState, useMemo } from 'react';
import Flashcard from '@/components/Flashcard';
import vocabularyData from '@/data/vocabulary.json';
import { useAppStore } from '@/store/useAppStore';

type CategoryFilter = 'all' | 'ism' | 'fiil' | 'harf';

export default function FlashcardPage() {
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const { updateFlashcardProgress, addXP, updateStreak } = useAppStore();

    const filteredWords = useMemo(() => {
        if (categoryFilter === 'all') return vocabularyData;
        return vocabularyData.filter((word) => word.category === categoryFilter);
    }, [categoryFilter]);

    const currentWord = filteredWords[currentIndex];

    const handleNext = () => {
        if (currentIndex < filteredWords.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back
        }
    };

    const handleCorrect = () => {
        if (currentWord) {
            updateFlashcardProgress(currentWord.word_id, true);
            addXP(10);
            updateStreak();
        }
        handleNext();
    };

    const handleIncorrect = () => {
        if (currentWord) {
            updateFlashcardProgress(currentWord.word_id, false);
        }
        handleNext();
    };

    const categoryButtons: { value: CategoryFilter; label: string; labelAr: string }[] = [
        { value: 'all', label: 'Semua', labelAr: 'الكل' },
        { value: 'ism', label: 'Ism', labelAr: 'اِسْم' },
        { value: 'fiil', label: "Fi'il", labelAr: 'فِعْل' },
        { value: 'harf', label: 'Harf', labelAr: 'حَرْف' },
    ];

    return (
        <div className="px-4 py-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">Flashcard Kosakata</h1>
                <p className="text-muted text-sm">
                    {currentIndex + 1} / {filteredWords.length} kata
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
                {categoryButtons.map((btn) => (
                    <button
                        key={btn.value}
                        onClick={() => {
                            setCategoryFilter(btn.value);
                            setCurrentIndex(0);
                        }}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === btn.value
                                ? 'bg-primary text-white'
                                : 'bg-card text-muted border border-border'
                            }`}
                    >
                        <span className="font-arabic mr-1">{btn.labelAr}</span>
                        <span>{btn.label}</span>
                    </button>
                ))}
            </div>

            {/* Flashcard */}
            {currentWord ? (
                <Flashcard
                    arabic={currentWord.arabic}
                    translation={currentWord.translation}
                    category={currentWord.category}
                    root={currentWord.root}
                    onCorrect={handleCorrect}
                    onIncorrect={handleIncorrect}
                />
            ) : (
                <div className="card p-8 text-center">
                    <p className="text-muted">Tidak ada kata dalam kategori ini</p>
                </div>
            )}

            {/* Progress */}
            <div className="mt-8">
                <div className="flex justify-between text-sm text-muted mb-2">
                    <span>Progress</span>
                    <span>{Math.round((currentIndex / filteredWords.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(currentIndex / filteredWords.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
