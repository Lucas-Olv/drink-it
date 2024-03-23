import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import WelcomeScreen from '../views/WelcomeScreen.vue';
import PreferencesScreen from '../views/PreferencesScreen.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomeScreen
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: PreferencesScreen
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
