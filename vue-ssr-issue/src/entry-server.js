// entry-server.js
import { createApp } from './factory-application'
import createApi from './factory-api'

export default context => {
    return new Promise((resolve, reject) => {
        const { application, router, store } = createApp(createApi(context.axiosInstance));
        router.push(context.request.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store: store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state;
                resolve(application);
            }).catch(reject)
        }, reject)
    })
}

