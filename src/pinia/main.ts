import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { MainState } from '@/types/main.ts'

const useMainStore = defineStore('main', {
  state: ():MainState => ({
    menuList: [],
  }),
  getters: {
    getMenuList: state => {
      return state.menuList
    }
  },
  actions: {
    init_menuList() {
      this.menuList = [{
        id: uuid(),
        label: '组件',
        router: '/overview'
      }]
    }
  }
})


export default useMainStore
