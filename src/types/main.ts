export interface MainState {
  menuList: MenuItem[],
  menus: MenuItem[],
}

export interface MenuItem {
  id: String,
  label: String,
  router: String,
}