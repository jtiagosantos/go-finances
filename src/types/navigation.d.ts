import { RoutesList } from './RoutesList'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesList {}
  }
}