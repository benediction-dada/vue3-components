/**
 * @author yuda
 * @description pinia仓库（存放项目基本信息）
 */

import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { MainState, ThemeType } from '@/types/main.ts'
import $config from '@/assets/js/config'

const useMainStore = defineStore('main', {
  state: ():MainState => ({
    menuList: [], // 导航菜单
    isSmallScreen: false, // 判断是否是小屏幕
    themeType: 'light', // 主题类型  light | dark

    ListenScreen: null
  }),
  getters: {
    getMenuList: state => state.menuList,
    getIsSmallScreen: state => state.isSmallScreen,
    getThemeType: state => state.themeType
  },
  actions: {
    //项目初始化
    init() {
      // 初始化菜单
      this.init_menuList()
      // 初始化参数
      this.initParams()
      // 初始化窗口监听事件
      this.install_WindowListen()
    },
    destroyed() {
      // 卸载窗口监听事件
      this.unstall_WindowListen()
    },
    // 初始化菜单
    init_menuList() {
      this.menuList = [{
        id: uuid(),
        label: '组件',
        router: '/components'
      }]
    },
    // 初始化参数
    initParams() {
      const innerWidth = window.innerWidth

      // 赋值isSmallScreen
      this.isSmallScreen = innerWidth <= $config.SMALL_SCREEN_WIDTH
    },
    // 初始化窗口监听事件
    install_WindowListen() {
      this.ListenScreen = ListenScreen.bind(this)
      window.addEventListener('resize', this.ListenScreen)
    },
    // 卸载窗口监听事件
    unstall_WindowListen() {
      window.addEventListener('resize', this.ListenScreen)
    },


    set_themeType(type: ThemeType) {
      this.themeType = type
    }
  }
})

let timmer:any = null
function ListenScreen() {
  if(timmer) return
  timmer = setTimeout(() => {
    const innerWidth = window.innerWidth
    this.isSmallScreen = innerWidth <= $config.SMALL_SCREEN_WIDTH
    clearTimeout(timmer)
    timmer = null
  }, 50)
}


export default useMainStore
