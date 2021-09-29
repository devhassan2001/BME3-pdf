import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home';
import AboutMe from '../views/AboutMe';
import Addfile from '../views/Addfile';
import DisplayFile from '../views/DisplayFile';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/Addfile',
    name: 'Addfile',
    component: Addfile
  },
  {
    path: '/DisplayFile/:id',
    name: 'DisplayFile',
    component: DisplayFile,
    props: true
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
