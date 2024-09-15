export interface MainState {
  menuList: MenuItem[],
  activeMenu: MenuItem | null
  isSmallScreen: Boolean,
  themeType: ThemeType

  ListenScreen: Function | null
}

export interface MenuItem {
  id: string,
  label: string,
  path: string,
}

export type ThemeType = 'light' | 'dark'