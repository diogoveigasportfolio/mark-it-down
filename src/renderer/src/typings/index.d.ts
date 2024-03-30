export type PathItem = {
  id: string
  name: string
  content: string | undefined
  isFavorite: boolean
  children: PathItem[] | undefined
}

export type SideBarSizes = {
  sizes: number[]
  gutterSize: number
}
