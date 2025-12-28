'use client';

interface WordDetailProps {
    word: {
        arabic: string;
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
    };
    onClose: () => void;
}

export default function WordDetail({ word, onClose }: WordDetailProps) {
    const categoryLabels: Record<string, { label: string; labelAr: string; color: string }> = {
        ism: { label: 'Isim (Kata Benda)', labelAr: 'اِسْم', color: 'bg-blue-500' },
        fiil: { label: "Fi'il (Kata Kerja)", labelAr: 'فِعْل', color: 'bg-green-500' },
        harf: { label: 'Harf (Huruf)', labelAr: 'حَرْف', color: 'bg-amber-500' },
    };

    const categoryInfo = categoryLabels[word.category] || { label: word.category, labelAr: '', color: 'bg-gray-500' };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={onClose}
        >
            <div
                className="mobile-container w-full bg-[#1e293b] rounded-t-3xl animate-slide-up max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
                </div>

                {/* Content */}
                <div className="px-6 pb-8">
                    {/* Arabic Word */}
                    <div className="text-center mb-6">
                        <h2 className="text-5xl font-arabic text-white mb-2">
                            {word.arabic}
                        </h2>
                        <span className={`${categoryInfo.color} px-3 py-1 rounded-full text-sm inline-block`}>
                            <span className="font-arabic mr-2">{categoryInfo.labelAr}</span>
                            <span>{categoryInfo.label}</span>
                        </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        {/* Translation */}
                        <div className="card p-4">
                            <p className="text-muted text-sm mb-1">📖 Terjemah</p>
                            <p className="text-xl text-white font-medium">{word.translation}</p>
                        </div>

                        {/* Root */}
                        {word.root !== '-' && (
                            <div className="card p-4">
                                <p className="text-muted text-sm mb-1">🔤 Akar Kata</p>
                                <p className="text-2xl font-arabic text-secondary">{word.root}</p>
                            </div>
                        )}

                        {/* I'rab */}
                        {word.irab && word.irab.position !== '-' && (
                            <div className="card p-4">
                                <p className="text-muted text-sm mb-2">📝 I&apos;rab</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted">Kedudukan:</span>
                                        <span className="text-white font-arabic">{word.irab.position}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Hukum:</span>
                                        <span className="text-white font-arabic">{word.irab.case}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Tanda:</span>
                                        <span className="text-white font-arabic">{word.irab.sign}</span>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-700">
                                        <p className="text-sm text-gray-300">{word.irab.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-6 py-4 rounded-xl bg-gray-700 text-white font-medium active:scale-95 transition-transform"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
