// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export function createStore($api) {
    return new Vuex.Store({
        state: {
            user: {}
        },
        actions: {
        },
        mutations: {
        }
    })
}