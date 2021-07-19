import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'PjAuth',
  computed: {
    ...mapState('frame_menu', ['operators', 'pageKeyMap']),
    ...mapState('frame_show', ['operatorAuth'])
  },
  render() {
    const { $slots } = this
    const { meta } = this.$route
    const pageKey: any = meta.key || meta.managerKey
    const page = this.pageKeyMap[pageKey]
    const operatorMap = {}
    if (page) {
      ;(this.operators[page.id] || []).forEach((item) => {
        operatorMap[item.key] = true
      })
    }

    const $children = Object.entries($slots)
      .map(([k, slot]) => {
        if ((!this.operatorAuth || k === 'default' || operatorMap[k]) && slot) {
          return slot({})
        }
        return undefined
      })
      .filter((item) => !!item)

    return <div>{$children}</div>
  }
})
