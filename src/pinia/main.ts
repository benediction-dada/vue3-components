import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: ():State => ({
    menuList: [] as MenuItem[],
  }),
  getters: {
    menuList: state => state.menuList
  },
  actions: {
    set_menuList() {

    }
  }
})

interface State {
  menuList: MenuItem[]
}

interface MenuItem {
  id: String,
  label: String,
  router: String,
}

