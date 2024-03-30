export type FileType = {
  id: string
  name: string
  content: string
  isFavorite: boolean
}

export type FolderType = {
  id: string
  name: string
  children: FileType[]
}

export type ExplorerItemType = FolderType | FileType

export type SideBarSizesType = {
  sizes: number[]
  gutterSize: number
}
