/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp", "image/avif"],
    },
    pageExtensions: ["tsx", "ts", "jsx", "js"],
    env: {
        // BASE_API_URL: "http://dev.ibrush.ru:4100",
        BASE_API_URL: "http://dev.ibrush.ru:1337",

        YMAPS_API_URL: "https://api-maps.yandex.ru/3.0/?apikey=2fa3cf92-b220-400b-a235-6116892882a8&lang=ru_RU",

        BASE_NEXT_API_URL: "/api",

        DADATA_API_URL: "https://suggestions.dadata.ru",
        DADATA_API_KEY: "7535fab7665225612207d5c97d80ff8a0afe1c14",
        DADATA_SECRET_KEY: "3bcd19c59f6f2bf75776f6e32a7c99740213cdc6",
    },
};

module.exports = nextConfig;
