'use client';

import { useState } from 'react';
import { MaterialChapter } from '@/types/nahwu';
import ReactMarkdown from 'react-markdown';

interface Props {
    chapter: MaterialChapter;
    onComplete: () => void;
}

export default function LessonViewer({ chapter, onComplete }: Props) {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = chapter.lessons.length + chapter.quiz.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const isLesson = currentStep < chapter.lessons.length;
    const lesson = isLesson ? chapter.lessons[currentStep] : null;
    const quizIndex = currentStep - chapter.lessons.length;
    const quiz = !isLesson ? chapter.quiz[quizIndex] : null;

    return (
        <div className="flex flex-col h-full min-h-[600px] bg-card rounded-2xl overflow-hidden border border-border">
            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-700 w-full">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center animate-fade-in">

                {/* Lesson Content */}
                {isLesson && lesson && (
                    <div className="w-full max-w-md">
                        {lesson.type === 'text' && (
                            <div className="prose prose-invert lg:prose-xl">
                                <ReactMarkdown>{lesson.content}</ReactMarkdown>
                            </div>
                        )}

                        {lesson.type === 'example' && (
                            <div className="space-y-6">
                                <p className="text-muted text-lg">{lesson.content}</p>
                                <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                    <h2 className="text-4xl font-arabic text-white mb-3" dir="rtl">
                                        {lesson.arabicText}
                                    </h2>
                                    <p className="text-xl text-blue-300 font-medium">
                                        {lesson.translation}
                                    </p>
                                </div>
                            </div>
                        )}

                        {lesson.type === 'table' && (
                            <div className="w-full overflow-x-auto">
                                <div className="prose prose-invert max-w-none text-left">
                                    <ReactMarkdown>{lesson.content}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Quiz Content */}
                {quiz && (
                    <div className="w-full max-w-md">
                        <span className="text-sm font-bold text-accent tracking-widest uppercase mb-4 block">
                            Kuis {quizIndex + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-8">
                            {quiz.question}
                        </h3>

                        {quiz.type === 'multiple-choice' && (
                            <div className="space-y-3">
                                {quiz.options?.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            if (option.isCorrect) {
                                                handleNext();
                                            } else {
                                                alert('Kurang tepat, coba lagi!');
                                            }
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-left transition-all active:scale-95 flex justify-between items-center group"
                                    >
                                        <span className="font-medium text-gray-200">{option.text}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            👉
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {quiz.type === 'fill-blank' && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Ketik jawaban..."
                                    className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-primary outline-none"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = (e.target as HTMLInputElement).value;
                                            if (val.toLowerCase().trim() === quiz.correctAnswer?.toLowerCase()) {
                                                handleNext();
                                            } else {
                                                alert('Salah! Coba lagi.');
                                            }
                                        }
                                    }}
                                />
                                <p className="text-xs text-muted">Tekan Enter untuk cek jawaban</p>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Footer Navigation */}
            {isLesson && (
                <div className="p-6 border-t border-gray-700">
                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        Lanjut
                    </button>
                </div>
            )}
        </div>
    );
}
