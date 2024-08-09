export interface componentsStore {
  components: componentsGroup[]
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
}