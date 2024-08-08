export interface MainState {
  menuList: MenuItem[],
  isSmallScreen: Boolean,

  ListenScreen: Function | null
}

export interface MenuItem {
  id: string,
  label: string,
  router: string,
}