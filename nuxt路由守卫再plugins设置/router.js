import Router from 'vue-router'
// Vue.use(Router)
// const router = new Router({ ...routerOptions, base  })
export default ({app,route}) => {
    app.router.afterEach((to, from) => {
   if(to.path !== '/'){
    let name = localStorage.getItem('name')
    if(name !== 'cbb'){
      console.log('请登录');
      app.router.push('/')
   
    }else{
      console.log('登录成功');

    }
   }
   
      //
    })
  }