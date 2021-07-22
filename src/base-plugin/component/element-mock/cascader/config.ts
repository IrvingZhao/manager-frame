import { VNode } from 'vue'

export type CascaderNodeValue = string | number
export type CascaderNodePathValue = CascaderNodeValue[]
export type CascaderValue = CascaderNodeValue | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]

export interface CascaderOption extends Record<string, unknown> {
  label?: string
  value?: CascaderNodeValue
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}

type ChildrenData = CascaderOption[] | undefined

export interface CascaderNode {
  readonly uid: number
  readonly level: number
  readonly value: CascaderNodeValue
  readonly label: string
  readonly pathNodes: CascaderNode[]
  readonly pathValues: CascaderNodePathValue
  readonly pathLabels: string[]
  childrenData: ChildrenData
  children: CascaderNode[]
  text: string
  loaded: boolean
  checked: boolean
  indeterminate: boolean
  loading: boolean
  readonly isDisabled: boolean
  readonly isLeaf: boolean
  valueByOption: CascaderNodePathValue | CascaderNodeValue

  appendChild(childData: CascaderOption): CascaderNode

  calcText(allLevels: boolean, separator: string): string

  broadcast(event: string, ...args: unknown[]): void

  emit(event: string, ...args: unknown[]): void

  onParentCheck(checked: boolean): void

  onChildCheck(): void

  setCheckState(checked: boolean): void

  doCheck(checked: boolean): void
}

type RenderLabelParam = {
  node: CascaderNode
  data: CascaderOption
}

export declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
export type isDisabled = (data: CascaderOption, node: CascaderNode) => boolean
export type isLeaf = (data: CascaderOption, node: CascaderNode) => boolean
export type Resolve = (dataList?: CascaderOption[]) => void
export type LazyLoad = (node: CascaderNode, resolve: Resolve) => void
export type RenderLabel = (param: RenderLabelParam) => VNode | VNode[]

export interface CascaderProps {
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: LazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: string | isDisabled
  leaf?: string | isLeaf
  hoverThreshold?: number
}
