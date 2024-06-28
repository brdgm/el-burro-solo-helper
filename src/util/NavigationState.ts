import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { State } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default class NavigationState {

  readonly round : number
  readonly difficultyLevel : DifficultyLevel

  public constructor(route: RouteLocation, state: State) {
    this.round = getIntRouteParam(route, 'round')
    this.difficultyLevel = state.setup.difficultyLevel
  }

}
