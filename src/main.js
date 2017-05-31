// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

import App from './components/App';
import router from './router';

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:3000/graphql',
        transportBatching: true
    })
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    apolloProvider,
    template: '<App/>',
    components: { App }
});
