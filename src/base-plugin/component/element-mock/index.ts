import { App } from 'vue'
import Affix from './affix'
import Alert from './alert'
import Aside from './aside'
import Autocomplete from './autocomplete'
import Avatar from './avatar'
import Backtop from './backtop'
import Badge from './badge'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'
import ButtonGroup from './button-group'
import Calendar from './calendar'
import Card from './card'
import Cascader from './cascader'
import CascaderPanel from './cascader-panel'
import Checkbox from './checkbox'
import CheckboxButton from './checkbox-button'
import CheckboxGroup from './checkbox-group'
import Col from './col'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import CollapseTransition from './collapse-transition'
import ColorPicker from './color-picker'
import Container from './container'
import DatePicker from './date-picker'
import Divider from './divider'
import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import DropdownMenu from './dropdown-menu'
import Empty from './empty'
import Footer from './footer'
import Form from './form'
import FormItem from './form-item'
import Header from './header'
import Icon from './icon'
import Image from './image'
import ImageViewer from './image-viewer'
import Input from './input'
import InputNumber from './input-number'
import Link from './link'
import Main from './main'
import Menu from './menu'
import MenuItem from './menu-item'
import MenuItemGroup from './menu-item-group'
import Option from './option'
import OptionGroup from './option-group'
import PageHeader from './page-header'
import Popconfirm from './popconfirm'
import Popover from './popover'
import Popper from './popper'
import Progress from './progress'
import Radio from './radio'
import RadioButton from './radio-button'
import RadioGroup from './radio-group'
import Rate from './rate'
import Row from './row'
import Scrollbar from './scrollbar'
import Select from './select'
import Slider from './slider'
import Step from './step'
import Steps from './steps'
import Submenu from './submenu'
import Switch from './switch'
import TabPane from './tab-pane'
import Table from './table'
import TableColumn from './table-column'
import Tabs from './tabs'
import Tag from './tag'
import TimePicker from './time-picker'
import TimeSelect from './time-select'
import Timeline from './timeline'
import TimelineItem from './timeline-item'
import Tooltip from './tooltip'
import Transfer from './transfer'
import Tree from './tree'
import Upload from './upload'
import Space from './space'
import Skeleton from './skeleton'
import SkeletonItem from './skeleton-item'

export default {
  install(Vue: App) {
    Vue.component('pj-affix', Affix)
    Vue.component('pj-alert', Alert)
    Vue.component('pj-aside', Aside)
    Vue.component('pj-autocomplete', Autocomplete)
    Vue.component('pj-avatar', Avatar)
    Vue.component('pj-backtop', Backtop)
    Vue.component('pj-badge', Badge)
    Vue.component('pj-breadcrumb', Breadcrumb)
    Vue.component('pj-breadcrumb-item', BreadcrumbItem)
    Vue.component('pj-button-group', ButtonGroup)
    Vue.component('pj-calendar', Calendar)
    Vue.component('pj-card', Card)
    Vue.component('pj-cascader', Cascader)
    Vue.component('pj-cascader-panel', CascaderPanel)
    Vue.component('pj-checkbox', Checkbox)
    Vue.component('pj-checkbox-button', CheckboxButton)
    Vue.component('pj-checkbox-group', CheckboxGroup)
    Vue.component('pj-col', Col)
    Vue.component('pj-collapse', Collapse)
    Vue.component('pj-collapse-item', CollapseItem)
    Vue.component('pj-collapse-transition', CollapseTransition)
    Vue.component('pj-color-picker', ColorPicker)
    Vue.component('pj-container', Container)
    Vue.component('pj-date-picker', DatePicker)
    Vue.component('pj-divider', Divider)
    Vue.component('pj-dropdown', Dropdown)
    Vue.component('pj-dropdown-item', DropdownItem)
    Vue.component('pj-dropdown-menu', DropdownMenu)
    Vue.component('pj-empty', Empty)
    Vue.component('pj-footer', Footer)
    Vue.component('pj-form', Form)
    Vue.component('pj-form-item', FormItem)
    Vue.component('pj-header', Header)
    Vue.component('pj-icon', Icon)
    Vue.component('pj-image', Image)
    Vue.component('pj-image-viewer', ImageViewer)
    Vue.component('pj-input', Input)
    Vue.component('pj-input-number', InputNumber)
    Vue.component('pj-link', Link)
    Vue.component('pj-main', Main)
    Vue.component('pj-menu', Menu)
    Vue.component('pj-menu-item', MenuItem)
    Vue.component('pj-menu-item-group', MenuItemGroup)
    Vue.component('pj-option', Option)
    Vue.component('pj-option-group', OptionGroup)
    Vue.component('pj-page-header', PageHeader)
    Vue.component('pj-popconfirm', Popconfirm)
    Vue.component('pj-popover', Popover)
    Vue.component('pj-popper', Popper)
    Vue.component('pj-progress', Progress)
    Vue.component('pj-radio', Radio)
    Vue.component('pj-radio-button', RadioButton)
    Vue.component('pj-radio-group', RadioGroup)
    Vue.component('pj-rate', Rate)
    Vue.component('pj-row', Row)
    Vue.component('pj-scrollbar', Scrollbar)
    Vue.component('pj-select', Select)
    Vue.component('pj-skeleton', Skeleton)
    Vue.component('pj-skeleton-item', SkeletonItem)
    Vue.component('pj-slider', Slider)
    Vue.component('pj-space', Space)
    Vue.component('pj-step', Step)
    Vue.component('pj-steps', Steps)
    Vue.component('pj-submenu', Submenu)
    Vue.component('pj-switch', Switch)
    Vue.component('pj-tab-pane', TabPane)
    Vue.component('pj-table', Table)
    Vue.component('pj-table-column', TableColumn)
    Vue.component('pj-tabs', Tabs)
    Vue.component('pj-tag', Tag)
    Vue.component('pj-timeline', Timeline)
    Vue.component('pj-timeline-item', TimelineItem)
    Vue.component('pj-time-picker', TimePicker)
    Vue.component('pj-time-select', TimeSelect)
    Vue.component('pj-tooltip', Tooltip)
    Vue.component('pj-transfer', Transfer)
    Vue.component('pj-tree', Tree)
    Vue.component('pj-upload', Upload)
  }
}

export * from './define'
