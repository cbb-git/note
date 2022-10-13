const pkg = require("./package");

const _runtimeEnv =
  process.env.RUNTIME_ENV && process.env.RUNTIME_ENV == "docker"
    ? "docker"
    : "";

var path = require("path");

const _buildEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const baseConfig = require("./config/config." + _buildEnv + ".js")

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
// const NODE_ENV = 'development';

let plugins = [
  // { src: "@/plugins/vue-awesome-swiper.js", ssr: false },
  { src: "@/plugins/jquery.js", ssr: false },
  { src: "@/plugins/polyfill.object-fit.min.js", ssr: false },
];

if (NODE_ENV == "production") {
  plugins.push({ src: "@/plugins/sensordata.js", ssr: false });
  //plugins.push({ src: "@/plugins/ba.js", ssr: false });
}
module.exports = Object.assign(
  {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: '贝锐官网|花生壳官网|DNS内网穿透|域名注册|向日葵远程控制|远程桌面|蒲公英路由器-贝锐官网',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        },
        {
          name: "renderer",
          content: "webkit"
        },
        {
          name: "force-rendering",
          content: "webkit"
        },
        {
          'http-equiv': "X-UA-Compatible",
          name: "X-UA-Compatible",
          content: "IE=Edge,chrome=1"
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          innerHTML:
            "var winWidth = window.innerWidth;" +
            "if(winWidth <= 770) {" +
            "document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/10+'px';" +
            "}" +
            "window.addEventListener('resize',function(){" +
            "winWidth = window.innerWidth;" +
            "if(winWidth <= 770) {" +
            "document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/10+'px';" +
            "}else{" +
            "document.getElementsByTagName('html')[0].style.fontSize='inherit';" +
            "}" +
            "});",
          type: "text/javascript",
          charset: "utf-8"
        },
        {
          innerHTML:
            `(function() {
              function trim(mystr) {
                while ((mystr.indexOf(" ") == 0) && (mystr.length > 1)) {
                  mystr = mystr.substring(1, mystr.length);
                }
                while ((mystr.lastIndexOf(" ") == mystr.length - 1)
                  && (mystr.length > 1)) {
                  mystr = mystr.substring(0, mystr.length - 1);
                }
                if (mystr == " ") {
                  mystr = "";
                }
                return mystr;
              }
              function getCookie() {
                var cookie = {};
                var all = document.cookie;
                if (all === "") return cookie;
                var list = all.split(";");
                for (var i = 0; i < list.length; i++) {
                  var item = list[i];
                  var p = item.indexOf("=");
                  var name = item.substring(0, p);
                  name = trim(decodeURIComponent(name));
                  var value = item.substring(p + 1);
                  value = trim(decodeURIComponent(value));
                  cookie[name] = value;
                }
                return cookie;
              }
              setTimeout(function() {
                var qimoClientId = null;
                var cookies = getCookie();
                if (cookies) {
                  qimoClientId = {
                    userId: cookies['_uid_'],
                    customField: {
                      '帐号': cookies['_account_'],
                      '用户ID': cookies['_uid_']
                    }
                  };
                }
                window.qimoClientId = qimoClientId;
                var hm = document.createElement('script');
                hm.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=f6abfad0-fbe5-11ea-9b98-4947dea401c2&autoShow=false&language=ZHCN';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
              }, 200);
            })()`,
          type: "text/javascript",
          charset: "utf-8",
        },
       
      ],
      __dangerouslyDisableSanitizers: ["script"],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      // "@/assets/scss/common.scss",
      "@/static/css/bootstrap.min.css",
      "@/assets/scss/common.scss",
      "@/static/css/polyfill.object-fit.css",
      // { src: "swiper/dist/css/swiper.css" },
    ],
    router: {
      extendRoutes(routes, resolve) {
        routes.push({
          path: '/about/index:id',
          component: resolve(__dirname, 'pages/about/index.vue'),
          name: 'about-index',
        }, {
          path: '/about/contact:id',
          component: resolve(__dirname, 'pages/about/contact.vue'),
          name: 'about-contact',
        })
      }
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: plugins,

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],
    router: {
      extendRoutes(routes, resolve) {
        routes.push({
          path: '/about/index:id',
          component: resolve(__dirname, 'pages/about/index.vue'),
          name: 'about-index',
        }, {
          path: '/about/contact:id',
          component: resolve(__dirname, 'pages/about/contact.vue'),
          name: 'about-contact',
        })
      }
    },
    /*
     ** You can extend webpack config here
     */
    publicPath:
      NODE_ENV == "production" ? "//res.orayimg.com/oray/1.0/" : "/_nuxt/",
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push();
      }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      /*
      ** You can extend webpack config here
      */
      publicPath:
        NODE_ENV == "production" ? "//res.orayimg.com/oray/1.0/" : "/_nuxt/",
      extend(config, ctx) {
        if (ctx.isDev && ctx.isClient) {
          config.module.rules.push();
        }
        config.resolve.alias["@sites"] = path.resolve(
          __dirname,
          "sites/" + NODE_ENV
        );
      },
      optimization: {
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            styles: {
              name: "style",
              test: /\.(scss|css)$/,
              minChunks: 1,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      },
      extractCSS: true,
      loaders: {
        imgUrl: {
          limit: 100,
        },
      },
    }
  },
  baseConfig
)
