export interface MainState {
  menuList: MenuItem[],
  isSmallScreen: Boolean,
  themeType: ThemeType

  ListenScreen: Function | null
}

export interface MenuItem {
  id: string,
  label: string,
  router: string,
}

export type ThemeType = 'light' | 'dark'