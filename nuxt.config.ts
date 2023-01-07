// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            sitename: 'Store',
            baseUrl: process.env.API_BASE_URL,
        },

    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=500, initial-scale=1',
            title: 'Store',
            meta: [
                { name: 'Store', content: 'My amazing site.' }
            ],
        },
    },

    css: ['vuetify/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/image-edge',
    ],
})
