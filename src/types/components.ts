export interface componentsStore {
  menus: componentsGroup[],
  actived: string,
  activedItem: null | componentsItem
}

export interface componentsGroup {
  id: string,
  name: string,
  label: string,
  children: componentsItem[]
}

export interface componentsItem {
  id: string,
  name: string,
  label: string,
  component: any
}