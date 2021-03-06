const GAID = 'G-3WBC205G07'
const GAcode = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GAID}');`

require('dotenv').config();
const {API_SERVER} = process.env;


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ハウスメーカー日本最大級口コミサイト HOUSE SEARCH',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: 'ハウスメーカー,口コミ,見積もり' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'ハウスメーカー日本最大級口コミサイト HOUSE SEARCH' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://rendaman.net' },
      { hid: 'og:title', property: 'og:title', content: 'ハウスメーカー日本最大級口コミサイト HOUSE SEARCH' },
      { hid: 'og:description', property: 'og:description', content: '全国のハウスメーカーの口コミ、費用明細が見られるのはHOUSE SEARCHだけ！人気のハウスメーカーランキングや工務店、設計事務所も検索' },
      { hid: 'og:image', property: 'og:image', content: 'https://rendaman.net' },

      { hid: 'fb:app_id', property: 'fb:app_id', content: 'App-ID' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@Twitter' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css', integrity:'sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1', crossorigin: 'anonymous'},
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css'},
      { rel: 'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'}
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js", integrity:"sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW", crossorigin:"anonymous"},
      { src: "https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js" },
      {
        hid: 'GAsrc',
        src: 'https://www.googletagmanager.com/gtag/js?id=' + GAID
      },
      {
        hid: 'GAcode',
        innerHTML: GAcode
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'GAsrc': ['innerHTML'],
      'GAcode': ['innerHTML']
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/acancel.scss',
    '@/assets/css/mixin.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/VueStarRating.js', mode: 'client' },
            { src: '~/plugins/VueSlickCarousel.js'},
            { src: '~/plugins/urls.js'}],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-3775560278137053',
      pageLevelAds: true,
      analyticsUacct: '27146816',
      analyticsDomainName: 'rendaman.net'
    }]
  ],
  proxy: {
    '/api/': 'https://rendaman.net',
    '/auth/': 'https://rendaman.net',
  },
  axios: {
    proxy: true,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 86400,
          type: 'JWT'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        endpoints: {
          login: { url: 'https://rendaman.net/api/auth/', method: 'post'},
          logout: false,
          user: { url: 'https://rendaman.net/api/v1/user/', method: 'get', propertyName: 'username'},
          refresh: { url: 'https://rendaman.net/api/auth/refresh/', method: 'post' },
        },
        tokenType: 'JWT'
      }
    },
    redirect: {
      login: '/login', 
      logout: '/',
      callback: false,
      home: '/'
    },
    watchLoggedIn: true
  },  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        options.loose = true;
      }
    }
  },
  // Environment Value
  env: {
    API_SERVER
  },
}
