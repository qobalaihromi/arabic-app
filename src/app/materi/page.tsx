'use client';

import Link from 'next/link';

const materiList = [
    {
        id: 1,
        title: 'Pengenalan Kalam',
        titleAr: 'أَنْوَاعُ الْكَلَامِ',
        description: 'Jenis-jenis kata dalam bahasa Arab: Ism, Fi\'il, Harf',
        icon: '📝',
        locked: false,
    },
    {
        id: 2,
        title: 'Tanda-tanda Isim',
        titleAr: 'عَلَامَاتُ الْاِسْمِ',
        description: 'Cara mengenali kata benda dalam bahasa Arab',
        icon: '🔍',
        locked: false,
    },
    {
        id: 3,
        title: "I'rab Dasar",
        titleAr: 'الْإِعْرَابُ',
        description: "Rafa', Nashab, Jarr, dan Jazm",
        icon: '📊',
        locked: true,
    },
    {
        id: 4,
        title: 'Mubtada dan Khabar',
        titleAr: 'الْمُبْتَدَأُ وَالْخَبَرُ',
        description: 'Struktur kalimat nominal dalam bahasa Arab',
        icon: '🔗',
        locked: true,
    },
    {
        id: 5,
        title: "Fa'il dan Fi'il",
        titleAr: 'الْفَاعِلُ وَالْفِعْلُ',
        description: 'Struktur kalimat verbal dalam bahasa Arab',
        icon: '⚡',
        locked: true,
    },
    {
        id: 6,
        title: 'Huruf Jar',
        titleAr: 'حُرُوفُ الْجَرِّ',
        description: 'Huruf-huruf yang men-jarr-kan isim',
        icon: '🔠',
        locked: true,
    },
];

export default function MateriPage() {
    return (
        <div className="px-4 py-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">Materi Nahwu Sharaf</h1>
                <p className="text-muted text-sm">Berdasarkan Matan Jurumiyyah</p>
            </div>

            {/* Progress */}
            <div className="card p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">Progress Materi</span>
                    <span className="text-white font-medium">2 / 6 selesai</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-1/3" />
                </div>
            </div>

            {/* Materi List */}
            <div className="space-y-3">
                {materiList.map((materi) => (
                    <div
                        key={materi.id}
                        className={`card p-4 ${materi.locked ? 'opacity-50' : 'card-hover'}`}
                    >
                        {materi.locked ? (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-2xl">
                                    🔒
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-semibold">{materi.title}</h3>
                                        <span className="font-arabic text-muted text-sm">{materi.titleAr}</span>
                                    </div>
                                    <p className="text-sm text-muted">{materi.description}</p>
                                </div>
                            </div>
                        ) : (
                            <Link href={`/materi/${materi.id}`} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">
                                    {materi.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-semibold">{materi.title}</h3>
                                        <span className="font-arabic text-muted text-sm">{materi.titleAr}</span>
                                    </div>
                                    <p className="text-sm text-muted">{materi.description}</p>
                                </div>
                                <span className="text-primary">→</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <p className="text-sm text-amber-300">
                    🚧 <strong>Coming Soon:</strong> Materi lengkap dari Matan Jurumiyyah sedang dalam pengembangan.
                    Selesaikan materi yang tersedia untuk membuka materi berikutnya.
                </p>
            </div>
        </div>
    );
}
