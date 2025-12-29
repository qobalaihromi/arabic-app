'use client';

import { useParams, useRouter } from 'next/navigation';
import LessonViewer from '@/components/LessonViewer';
import chapter1Data from '@/data/jurumiyyah/chapter1.json';
import { MaterialChapter } from '@/types/nahwu';

// Mock data loader - in real app would fetch based on ID
const getChapterData = (id: string): MaterialChapter | null => {
    if (id === '1') return chapter1Data as MaterialChapter;
    return null;
};

export default function MateriDetailPage() {
    const params = useParams();
    const router = useRouter();
    const chapterId = params.id as string;

    const chapter = getChapterData(chapterId);

    if (!chapter) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Materi Tidak Ditemukan</h2>
                <p className="text-muted mb-6">Materi yang Anda cari belum tersedia.</p>
                <button
                    onClick={() => router.back()}
                    className="text-primary hover:underline"
                >
                    &larr; Kembali ke Daftar Materi
                </button>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 h-[calc(100vh-80px)]">
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                    &larr;
                </button>
                <div>
                    <h1 className="text-lg font-bold text-white leading-tight">
                        {chapter.title}
                    </h1>
                    <p className="text-xs text-muted font-arabic">
                        {chapter.titleAr}
                    </p>
                </div>
            </div>

            {/* Lesson View */}
            <LessonViewer
                chapter={chapter}
                onComplete={() => {
                    // TODO: Save progress via Zustand/Supabase
                    alert('Selamat! Anda telah menyelesaikan materi ini +50 XP');
                    router.push('/materi');
                }}
            />
        </div>
    );
}
