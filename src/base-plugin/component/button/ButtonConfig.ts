export default {
  page: {
    submit: {
      type: 'primary',
      minWidth: '100px'
    },
    submitAndContinue: {
      type: 'orange',
      minWidth: '132px'
    },
    normalContinue: {
      type: 'orange',
      minWidth: '100px'
    },
    default: { minWidth: '100px' }
  },
  table: {
    delete: {
      type: 'danger',
      size: 'tiny',
      plan: true
    },
    default: { size: 'tiny' }
  },
  toolbar: {
    default: {
      type: 'primary',
      size: 'medium',
      round: true
    }
  },
  dialog: {
    confirm: {
      type: 'primary',
      size: 'small',
      minWidth: '80px',
      round: true
    },
    default: {
      size: 'small',
      minWidth: '80px',
      round: true
    }
  },
  messageBox: {
    confirm: {
      type: 'danger',
      size: 'mini',
      minWidth: '77px'
    },
    default: {
      size: 'mini',
      minWidth: '77px'
    }
  }
}
