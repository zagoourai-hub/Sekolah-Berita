import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';
import { slugify } from '../src/common/utils/slugify.js';
import { createEnvConfig } from '../src/config/env.config.js';
import { loadEnvFiles } from '../src/config/env-files.js';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { getDatabaseOptions } from '../src/prisma/database-options.js';

loadEnvFiles();

const env = createEnvConfig();
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(getDatabaseOptions()),
});

const images = {
  trophy:
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=85',
  students:
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=85',
  workshop:
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
  exam: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85',
  leadership:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
  technology:
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85',
  library:
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85',
  robotics:
    'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?auto=format&fit=crop&w=1200&q=85',
  ppdb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
};

async function seedSettings() {
  if ((await prisma.setting.count()) > 0) {
    return;
  }

  const settings = [
    { key: 'school_name', value: 'SMA Sawit' },
    {
      key: 'school_tagline',
      value: 'Berkarakter, Berprestasi, Berwawasan Digital',
    },
    { key: 'school_phone', value: '(021) 1234-5678' },
    { key: 'school_email', value: 'info@smknusantara.sch.id' },
    {
      key: 'school_address',
      value: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
    },
    { key: 'school_instagram', value: '@smknusantaradigital' },
    { key: 'school_youtube', value: 'SMA Sawit' },
  ];

  await Promise.all(
    settings.map((setting) =>
      prisma.setting.create({
        data: setting,
      }),
    ),
  );
}

async function main() {
  const adminPassword = await bcrypt.hash(env.seed.adminPassword, 10);
  const editorPass = await bcrypt.hash(env.seed.editorPass, 10);
  const email = env.seed.editorEmail;
  const name = env.seed.editorName;

  const admin = await prisma.user.upsert({
    where: { email: env.seed.adminEmail },
    update: {},
    create: {
      name: env.seed.adminName,
      email: env.seed.adminEmail,
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: env.seed.editorEmail },
    update: {},
    create: {
      name: name,
      email: email,
      password: editorPass,
      role: 'EDITOR',
    },
  });

  const categorySeeds = [
    {
      name: 'Prestasi',
      color: '#f5b936',
      description: 'Berita prestasi siswa, guru, dan sekolah.',
    },
    {
      name: 'Kegiatan',
      color: '#2563eb',
      description: 'Dokumentasi kegiatan sekolah dan industri.',
    },
    {
      name: 'Akademik',
      color: '#16a34a',
      description: 'Informasi akademik dan pembelajaran.',
    },
    {
      name: 'PPDB',
      color: '#dc2626',
      description: 'Informasi penerimaan peserta didik baru.',
    },
  ];

  const categories = await Promise.all(
    categorySeeds.map((category) =>
      prisma.category.upsert({
        where: { slug: slugify(category.name) },
        update: {},
        create: {
          ...category,
          slug: slugify(category.name),
        },
      }),
    ),
  );

  const categoryByName = Object.fromEntries(
    categories.map((category) => [category.name, category]),
  );

  const newsSeeds = [
    {
      title: 'Siswa SMA Sawit Raih Juara 1 Lomba Web Design Tingkat Kota',
      excerpt:
        'Tim Web Developer SMA Sawit berhasil meraih juara pertama dalam Lomba Web Design Tingkat Kota 2026.',
      content:
        'Prestasi membanggakan kembali diraih siswa SMA Sawit. Tim Web Developer sekolah berhasil menjadi juara pertama setelah menampilkan website informatif, responsif, dan memiliki pengalaman pengguna yang kuat. Kemenangan ini menjadi bukti kesiapan siswa menghadapi tantangan industri digital.',
      thumbnail: images.trophy,
      category: 'Prestasi',
      isBreaking: true,
      isFeatured: true,
      publishedAt: new Date('2026-05-19T08:00:00.000Z'),
      viewCount: 980,
    },
    {
      title: 'Workshop UI/UX Design Bersama Industri Kreatif',
      excerpt:
        'Siswa jurusan multimedia dan RPL belajar riset pengguna, wireframe, hingga prototyping bersama praktisi industri.',
      content:
        'Workshop UI/UX Design menghadirkan mentor dari industri kreatif. Siswa mempelajari proses desain produk digital mulai dari memahami kebutuhan pengguna, membuat alur interaksi, menyusun wireframe, hingga menguji prototype sederhana.',
      thumbnail: images.workshop,
      category: 'Kegiatan',
      isBreaking: false,
      isFeatured: true,
      publishedAt: new Date('2026-05-18T08:00:00.000Z'),
      viewCount: 740,
    },
    {
      title: 'Ujian Akhir Semester Genap T.A. 2025/2026 Dimulai',
      excerpt:
        'Pelaksanaan ujian akhir semester berlangsung tertib dengan jadwal yang sudah dibagikan kepada seluruh siswa.',
      content:
        'SMA Sawit melaksanakan Ujian Akhir Semester Genap Tahun Ajaran 2025/2026. Seluruh siswa diimbau hadir tepat waktu, membawa perlengkapan ujian, dan mengikuti tata tertib yang telah disampaikan wali kelas.',
      thumbnail: images.exam,
      category: 'Akademik',
      isBreaking: false,
      isFeatured: true,
      publishedAt: new Date('2026-05-17T08:00:00.000Z'),
      viewCount: 615,
    },
    {
      title: 'LDKS 2026: Membangun Karakter Kepemimpinan Siswa',
      excerpt:
        'OSIS dan MPK mengikuti latihan dasar kepemimpinan untuk menumbuhkan disiplin, tanggung jawab, dan kolaborasi.',
      content:
        'Latihan Dasar Kepemimpinan Siswa menjadi agenda pembinaan karakter bagi pengurus OSIS dan MPK. Kegiatan diisi dengan materi organisasi, komunikasi, pemecahan masalah, dan simulasi kerja tim.',
      thumbnail: images.leadership,
      category: 'Kegiatan',
      isBreaking: false,
      isFeatured: true,
      publishedAt: new Date('2026-05-16T08:00:00.000Z'),
      viewCount: 570,
    },
    {
      title: 'SMA Sawit Ikuti Pameran Pendidikan & Teknologi 2026',
      excerpt:
        'Siswa menampilkan karya inovatif di bidang teknologi informasi, desain, robotika, dan multimedia.',
      content:
        'SMA Sawit berpartisipasi dalam pameran pendidikan dan teknologi. Stan sekolah menampilkan karya aplikasi web, desain interaktif, produk multimedia, dan prototipe teknologi yang dibuat siswa.',
      thumbnail: images.technology,
      category: 'Kegiatan',
      isBreaking: true,
      isFeatured: false,
      publishedAt: new Date('2026-05-15T08:00:00.000Z'),
      viewCount: 480,
    },
    {
      title: 'Pelatihan Digital Marketing Bersama Praktisi Industri',
      excerpt:
        'Kelas XII mengikuti pelatihan digital marketing untuk memperkuat kesiapan memasuki dunia kerja.',
      content:
        'Pelatihan digital marketing membantu siswa memahami strategi konten, analitik media sosial, pemasaran berbasis data, dan penyusunan portofolio digital yang relevan dengan kebutuhan industri.',
      thumbnail: images.students,
      category: 'Akademik',
      isBreaking: false,
      isFeatured: false,
      publishedAt: new Date('2026-05-14T08:00:00.000Z'),
      viewCount: 430,
    },
    {
      title: 'Tim Robotik SMA Sawit Lolos ke Tingkat Provinsi',
      excerpt:
        'Tim robotik sekolah melaju ke tingkat provinsi setelah meraih hasil terbaik pada seleksi tingkat kota.',
      content:
        'Tim robotik SMA Sawit berhasil lolos ke tingkat provinsi. Keberhasilan ini didapat setelah siswa menampilkan robot yang stabil, cepat, dan mampu menyelesaikan misi lomba secara konsisten.',
      thumbnail: images.robotics,
      category: 'Prestasi',
      isBreaking: false,
      isFeatured: false,
      publishedAt: new Date('2026-05-13T08:00:00.000Z'),
      viewCount: 390,
    },
  ];

  if ((await prisma.news.count()) === 0) {
    await Promise.all(
      newsSeeds.map((news, index) =>
        prisma.news.create({
          data: {
            title: news.title,
            slug: slugify(news.title),
            excerpt: news.excerpt,
            content: news.content,
            thumbnail: news.thumbnail,
            status: 'PUBLISHED',
            isBreaking: news.isBreaking,
            isFeatured: news.isFeatured,
            publishedAt: news.publishedAt,
            viewCount: news.viewCount,
            authorId: index % 2 === 0 ? admin.id : editor.id,
            categoryId: categoryByName[news.category].id,
          },
        }),
      ),
    );
  }

  const announcements = [
    {
      title: 'Pendaftaran PPDB Gelombang 1 Telah Dibuka',
      content:
        'Pendaftaran PPDB gelombang pertama sudah dibuka. Calon peserta didik dapat mendaftar secara online melalui menu PPDB atau datang langsung ke sekolah pada jam kerja.',
      isImportant: true,
      publishedAt: new Date('2026-05-19T08:00:00.000Z'),
    },
    {
      title: 'Libur Hari Kenaikan Isa Almasih 29 Mei 2026',
      content:
        'Kegiatan belajar mengajar diliburkan sesuai kalender akademik. Pembelajaran kembali berjalan normal pada hari berikutnya.',
      isImportant: true,
      publishedAt: new Date('2026-05-18T08:00:00.000Z'),
    },
    {
      title: 'Pembagian Rapor Semester Genap T.A. 2025/2026',
      content:
        'Pembagian rapor semester genap dilaksanakan sesuai jadwal wali kelas. Orang tua/wali siswa diharapkan hadir tepat waktu.',
      isImportant: true,
      publishedAt: new Date('2026-05-16T08:00:00.000Z'),
    },
  ];

  if ((await prisma.announcement.count()) === 0) {
    await Promise.all(
      announcements.map((announcement) =>
        prisma.announcement.create({
          data: {
            title: announcement.title,
            slug: slugify(announcement.title),
            content: announcement.content,
            status: 'PUBLISHED',
            isImportant: announcement.isImportant,
            publishedAt: announcement.publishedAt,
          },
        }),
      ),
    );
  }

  const agendas = [
    {
      title: 'Ujian Kompetensi Keahlian TKJ & RPL',
      description:
        'Pelaksanaan ujian praktik kompetensi untuk program keahlian TKJ dan RPL.',
      location: 'Laboratorium Komputer',
      startDate: new Date('2026-05-24T08:00:00.000Z'),
    },
    {
      title: 'Workshop Cyber Security untuk Siswa',
      description:
        'Workshop pengenalan keamanan siber, etika digital, dan praktik dasar proteksi akun.',
      location: 'Aula Sekolah',
      startDate: new Date('2026-05-27T08:00:00.000Z'),
    },
    {
      title: 'Upacara Hari Lahir Pancasila',
      description:
        'Upacara bendera dalam rangka memperingati Hari Lahir Pancasila.',
      location: 'Lapangan Utama',
      startDate: new Date('2026-05-31T07:00:00.000Z'),
    },
    {
      title: 'Class Meeting Semester Genap',
      description:
        'Kegiatan class meeting untuk mempererat sportivitas dan kebersamaan siswa.',
      location: 'Area Sekolah',
      startDate: new Date('2026-06-05T08:00:00.000Z'),
    },
  ];

  if ((await prisma.agenda.count()) === 0) {
    await Promise.all(
      agendas.map((agenda) =>
        prisma.agenda.create({
          data: {
            title: agenda.title,
            slug: slugify(agenda.title),
            description: agenda.description,
            location: agenda.location,
            startDate: agenda.startDate,
            status: 'PUBLISHED',
          },
        }),
      ),
    );
  }

  const achievements = [
    {
      title: 'Juara 1 Lomba Web Design Tingkat Kota 2026',
      description:
        'Tim Web Developer sekolah menjadi juara pertama tingkat kota.',
      image: images.trophy,
      winner: 'Tim Web Developer SMA Sawit',
      level: 'Kota',
      date: new Date('2026-05-19T08:00:00.000Z'),
    },
    {
      title: '5 Medali Olimpiade Nasional 2026',
      description:
        'Siswa SMA Sawit meraih lima medali pada ajang olimpiade nasional.',
      image: images.students,
      winner: 'Siswa Berprestasi',
      level: 'Nasional',
      date: new Date('2026-05-17T08:00:00.000Z'),
    },
    {
      title: 'Lolos Provinsi Kompetisi Robotik Tingkat Kota',
      description: 'Tim robotik melaju ke babak provinsi setelah seleksi kota.',
      image: images.robotics,
      winner: 'Tim Robotik',
      level: 'Provinsi',
      date: new Date('2026-05-13T08:00:00.000Z'),
    },
  ];

  if ((await prisma.achievement.count()) === 0) {
    await Promise.all(
      achievements.map((achievement) =>
        prisma.achievement.create({
          data: {
            title: achievement.title,
            slug: slugify(achievement.title),
            description: achievement.description,
            image: achievement.image,
            winner: achievement.winner,
            level: achievement.level,
            date: achievement.date,
            status: 'PUBLISHED',
          },
        }),
      ),
    );
  }

  const gallerySeeds = [
    {
      title: 'Kegiatan Workshop Industri',
      image: images.workshop,
      description: 'Dokumentasi workshop bersama praktisi industri kreatif.',
    },
    {
      title: 'Pembelajaran Laboratorium Digital',
      image: images.technology,
      description: 'Kegiatan praktik siswa di laboratorium komputer.',
    },
    {
      title: 'Prestasi Siswa Tingkat Kota',
      image: images.trophy,
      description: 'Dokumentasi penghargaan siswa berprestasi.',
    },
    {
      title: 'Kegiatan Organisasi Siswa',
      image: images.leadership,
      description: 'Dokumentasi latihan kepemimpinan dan organisasi siswa.',
    },
  ];

  if ((await prisma.gallery.count()) === 0) {
    await prisma.gallery.createMany({ data: gallerySeeds });
  }

  if ((await prisma.ppdbInfo.count()) === 0) {
    await prisma.ppdbInfo.create({
      data: {
        title: 'PPDB Online SMA Sawit',
        content:
          'Penerimaan peserta didik baru dibuka untuk program keahlian Rekayasa Perangkat Lunak, Teknik Komputer dan Jaringan, Desain Komunikasi Visual, dan Multimedia. Pendaftaran dapat dilakukan secara online atau langsung ke sekolah.',
        banner: images.ppdb,
        startDate: new Date('2026-05-19T08:00:00.000Z'),
        endDate: new Date('2026-07-19T08:00:00.000Z'),
        status: 'PUBLISHED',
      },
    });
  }

  const mediaSeeds = [
    { filename: 'prestasi-unsplash.jpg', url: images.trophy },
    { filename: 'workshop-unsplash.jpg', url: images.workshop },
    { filename: 'akademik-unsplash.jpg', url: images.exam },
    { filename: 'robotik-unsplash.jpg', url: images.robotics },
    { filename: 'ppdb-unsplash.jpg', url: images.ppdb },
  ];

  if ((await prisma.media.count()) === 0) {
    await prisma.media.createMany({
      data: mediaSeeds.map((media) => ({
        ...media,
        mimeType: 'image/jpeg',
        size: 0,
      })),
    });
  }

  await seedSettings();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
