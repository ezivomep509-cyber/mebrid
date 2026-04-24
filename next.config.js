/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Legacy-хосты на случай, если останутся старые URL — можно убрать позже
      { protocol: 'https', hostname: 'royfamily.ru' },
      { protocol: 'https', hostname: 'media.dajar.pl' },
    ],
    // Cloudinary уже сам оптимизирует — Next.js оптимизация включена,
    // но для внешних CDN тоже можно отдавать «as is» флагом unoptimized.
    // Оставляем включённой оптимизацию — Vercel Image Optimization даст blur placeholder, ресайз под device.
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
