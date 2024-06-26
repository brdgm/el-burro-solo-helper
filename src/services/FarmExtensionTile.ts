import Action from './enum/Action'
import FarmExtensionShape from './enum/FarmExtensionShape'

export default interface FarmExtensionTile {
  id: string
  shape: FarmExtensionShape
  thatchedRoofAction: Action
  tiledRoofAction: Action
}
