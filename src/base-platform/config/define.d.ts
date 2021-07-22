import { Component } from '@plugin'

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

export interface AreaDataItem {
  name: string
  code: string
  areaCode: string
  zipCode: string
  parentCode: string
  totalName: string
  children: AreaDataItem[]
}

export interface AreaData {
  areaCascaderProp: Component.CascaderProps
  areaTreeData: AreaDataItem[]
  areaMapData: { [key: string]: AreaDataItem }
}

export interface AreaState {
  areaData: AreaData
}
