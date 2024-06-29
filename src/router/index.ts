import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import RoundPhaseFarm from '@/views/RoundPhaseFarm.vue'
import RoundPhaseRevenue from '@/views/RoundPhaseRevenue.vue'
import RoundPhaseTransport from '@/views/RoundPhaseTransport.vue'
import RoundPhaseScoring from '@/views/RoundPhaseScoring.vue'
import PhaseFinalScoring from '@/views/PhaseFinalScoring.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/round/:round/phase/farm',
    name: 'RoundPhaseFarm',
    component: RoundPhaseFarm
  },
  {
    path: '/round/:round/phase/revenue/turn/:turn',
    name: 'RoundPhaseRevenue',
    component: RoundPhaseRevenue
  },
  {
    path: '/round/:round/phase/transport/turn/:turn',
    name: 'RoundPhaseTransport',
    component: RoundPhaseTransport
  },
  {
    path: '/round/:round/phase/scoring',
    name: 'RoundPhaseScoring',
    component: RoundPhaseScoring
  },
  {
    path: '/finalScoring',
    name: 'PhaseFinalScoring',
    component: PhaseFinalScoring
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')