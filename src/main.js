// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
const io = require('blacksocket.io/client');

const socket = io(':23013/db');
console.log('get');
socket.on('connect', () => {
    socket.emit('get-db-info', (info) => {
        console.log(info);
    });
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
