import Vue from 'vue';
import Router from 'vue-router';
import Table from '@/components/Table/Table';
import Schedule from '@/components/Schedule/Schedule';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: Table
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    }
  ]
});
