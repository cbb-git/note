const _runtimeEnv = process.env.RUNTIME_ENV && process.env.RUNTIME_ENV == "docker" ? "docker" : "";

const path = require('path')
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
const baseConfig = require('./conf/' + NODE_ENV + '/nuxt.js')
module.exports = Object.assign(
    {
        mode: 'universal',
        /*
        ** Headers of the page
        */
        head: {
          title: '贝锐阳光小店 | 花生壳内网穿透 | 向日葵远程控制 | 蒲公英异地组网-Oray连接无处不在',
          meta: [
            { charset: 'utf-8' },
            {
              name: "viewport",
              content:
                "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
            },
            {
              name: "X-UA-Compatible",
              content: "IE=Edge,chrome=1"
            },
            {
              name: "renderer",
              content: "webkit"
            },
            {
              name: "keywords",
              content:
                "贝锐科技,花生壳官网,向日葵官网,蒲公英官网,动态域名,内网穿透,远程控制,远程桌面,远程办公,智能组网,智能路由器,SD-WAN,Cloud VPN,DDNS,RDP,域名解析,域名注册"
            },
            { hid: 'description', name: 'description', content: '贝锐科技旗下产品花生壳内网穿透、向日葵远程控制、蒲公英智能组网为用户提供简单易用的互联互通的解决方案。所有产品可免费使用。' }
          ],
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
          ],
          script: [
            // { src: 'http://a-pre.orayimg.com/js/vconsole.min.js', type: 'text/javascript'},
            {
              innerHTML:
                  "var winWidth = document.getElementsByTagName('html')[0].getBoundingClientRect().width || window.innerWidth;" +
                  "document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/10+'px';" +
                  "window.addEventListener('resize',function(){" +
                    "winWidth = window.innerWidth;" +
                    "document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/10+'px';" +
                  "});"
                  // +
                  // " new VConsole(); "
                  ,
                type: "text/javascript",
                charset: "utf-8"
            }
          ],
          // 不对<script>标签中内容做转义处理
          __dangerouslyDisableSanitizers: ["script"]
        },
        /*
        ** Customize the progress-bar color
        */
        loading: { color: '#fff' },
        /*
        ** Global CSS
        */
        css: [
          "@/assets/scss/index.scss",
          // "@/assets/font/font.css",
          // "@/assets/font/font2.css",
          // "@/assets/font/font3.css",
        ],
        /*
        ** Plugins to load before mounting the App
        */
        plugins: [
          { src: '@/plugins/vue-swiper.ts', ssr: false},
          { src: '@/plugins/vant.ts', ssr: false}
        ],
        /*
        ** Nuxt.js dev-modules
        */
        buildModules: [
        ],
        /*
        ** Nuxt.js modules
        */
        modules: [
          // Doc: https://axios.nuxtjs.org/usage
          '@nuxtjs/axios',
        ],
        /*
        ** Axios module configuration
        ** See https://axios.nuxtjs.org/options
        */
        axios: {
        },
        /*
        ** Build configuration
        */
        build: {
          /*
          ** You can extend webpack config here
          */
          publicPath:
            NODE_ENV == "production" ? (_runtimeEnv == "docker" ? "//res.orayimg.com/oray/sunshop/1.0" : "/_nuxt/") : "/_nuxt/",
          extend (config, ctx) {
            let sites = path.resolve(
                __dirname,
                // 'sites/' + ((NODE_ENV === 'production' || NODE_ENV === 'development' || NODE_ENV === 'app') ? 'production' : 'testing') + '.js'
                'sites/' + ((NODE_ENV === 'production') ? 'production' : 'testing') + '.js'
            )
            config.resolve.alias['@sites'] = sites;
            config.resolve.alias['src'] = path.resolve(
              __dirname,
              ''
            );
          }
        }
    },
    baseConfig
)
