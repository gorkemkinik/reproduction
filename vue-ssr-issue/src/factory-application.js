import Vue from 'vue'
import Application from './Application'
import { createRouter } from './factory-router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import VueLazyload from 'vue-lazyload';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});

Vue.use(VueLazyload,{
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
    listenEvents: [ 'scroll', 'wheel', 'mousewheel', 'resize','orderChanged'],
    loading: '/assets/images/ring.svg'
});

export function createApp ($api) {
    const router = createRouter();
    const store = createStore($api);
    //sync(store, router);
    const application = new Vue({
        router,
        store,
        render: h => h(Application)
    });

    return { application, router, store }
}