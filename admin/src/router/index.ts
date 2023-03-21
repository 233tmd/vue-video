import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from "../views/MainView.vue"
import ResourceCrud from "../views/ResourceCrud.vue";
// import CourseList from "../views/courses/CourseList.vue";
// import CourseEdit from "../views/courses/CourseEdit.vue";

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    component: MainView,
    children: [
      { name: 'home', path: '/', component: HomeView },
      { name: 'resource-list', path: '/:resource/list', component: ResourceCrud, props: true },
      // { name: 'courses-list', path: '/courses/list', component: CourseList },
      // { name: 'courses-edit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      // { name: 'courses-create', path: '/courses/create', component: CourseEdit },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
