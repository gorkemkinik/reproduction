export default [
    { path: '/home', component: () => import(/* webpackChunkName: "home" */'./components/Home')},
    { path: '/about', component: () => import(/* webpackChunkName: "about" */'./components/About')},
    ];