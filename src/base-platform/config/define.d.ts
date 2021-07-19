export interface SystemState {
  activeRouterView: boolean
  renderNoAuth: boolean
}

export interface SystemOperator {
  reload(): void
}

export interface DicItem {
  key: string
  label: string
}

export interface DicItemMap {
  [key: string]: string
}

export interface DicState {
  allDicMap: { [key: string]: DicItemMap }
  allDicArray: { [key: string]: DicItem[] }
}
