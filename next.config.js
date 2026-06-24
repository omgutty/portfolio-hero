/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
  headers: async () => [
    {
      source: '/Om_Gutty_Resume.docx',
      headers: [
        { key: 'Content-Disposition', value: 'attachment; filename="Om_Gutty_Resume.docx"' },
      ],
    },
  ],
}

module.exports = nextConfig
