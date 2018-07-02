//client-entry.js
import { createApp } from "./factory-application";
import createApi from "./factory-api";

const { application, router, store } = createApp(createApi());

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    application.$mount("#app");
});

