import { defineComponent, PropType } from 'vue'
import { NOOP } from '@vue/shared'
import { ElUpload } from 'element-plus'
import ajax from 'element-plus/packages/upload/src/ajax'

type Nullable<T> = T | null

type ListType = 'text' | 'picture' | 'picture-card'

type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

interface ElFile extends File {
  uid: number
}

type UploadFile = {
  name: string
  percentage?: number
  status: UploadStatus
  size: number
  response?: unknown
  uid: number
  url?: string
  raw: ElFile
}

type FileHandler<T = void> = (file: UploadFile, uploadFiles: UploadFile[]) => T
type FileResultHandler<T = any> = (param: T, file: UploadFile, uploadFiles: UploadFile[]) => void

type PFileHandler<T> = PropType<FileHandler<T>>
type PFileResultHandler<T = any> = PropType<FileResultHandler<T>>

export default defineComponent({
  name: 'PjBreadcrumbItem',
  extends: ElUpload,
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object as PropType<Headers>,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'file'
    },
    drag: {
      type: Boolean,
      default: false
    },
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: {
      type: Function as PFileHandler<void>,
      default: NOOP
    },
    beforeRemove: {
      type: Function as PFileHandler<boolean>,
      default: NOOP
    },
    onRemove: {
      type: Function as PFileHandler<void>,
      default: NOOP
    },
    onChange: {
      type: Function as PFileHandler<void>,
      default: NOOP
    },
    onPreview: {
      type: Function as PropType<() => void>,
      default: NOOP
    },
    onSuccess: {
      type: Function as PFileResultHandler,
      default: NOOP
    },
    onProgress: {
      type: Function as PFileResultHandler<ProgressEvent>,
      default: NOOP
    },
    onError: {
      type: Function as PFileResultHandler<Error>,
      default: NOOP
    },
    fileList: {
      type: Array as PropType<UploadFile[]>,
      default: () => {
        return [] as UploadFile[]
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String as PropType<ListType>,
      default: 'text' as ListType // text,picture,picture-card
    },
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    limit: {
      type: Number as PropType<Nullable<number>>,
      default: null
    },
    onExceed: {
      type: Function,
      default: () => NOOP
    }
  },
  setup(props, ctx) {
    const { setup } = ElUpload
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
