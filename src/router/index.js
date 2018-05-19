import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);
import Register from "../pages/register.vue";
import UserApplyList from "../pages/user-apply-list.vue";
import BailerIndex from "../pages/bailer-index.vue";
import adminReview from "../pages/adminReview.vue";
import login from "../pages/login.vue";

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user/apply/list',
      name: 'userApply',
      component: UserApplyList
    },
    {
      path: '/bailer/index',
      name: 'bailerIndex',
      component: BailerIndex
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/adminReview',
      name: 'adminReview',
      component: adminReview
    }

  ]
})
