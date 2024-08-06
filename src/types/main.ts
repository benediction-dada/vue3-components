export interface MainState {
  menuList: MenuItem[],
}

export interface MenuItem {
  id: string,
  label: string,
  router: string,
}