// import Vue from 'vue';
// import Router from 'vue-router';

// import HomePage from '../components/HomePage'
// import LoginPage from '../components/LoginPage'
// import RegisterPage from '../components/RegisterPage'

// Vue.use(Router);

// export const router = new Router({
//   mode: 'history',
//   routes: [
//     { path: '/', component: HomePage },
//     { path: '/login', component: LoginPage },
//     { path: '/register', component: RegisterPage },

//     // otherwise redirect to home
//     { path: '*', redirect: '/' }
//   ]
// });

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// })


import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'
import StartNewGame from '../components/StartNewGame'
// import HelloWorld from '@/components/HelloWorld'
// import colorPicker from '@/components/colorPicker'

Vue.use(Router)

export const router = new Router({
  // routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    
    // {
    //   path: '/',
    //   name: 'colorPicker',
    //   component: colorPicker
    // }
    mode: 'history',
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/startNewGame', name:'startNewGame', component: StartNewGame, props : true },
  
      // otherwise redirect to home
      { path: '*', redirect: '/' }
    ]
})


