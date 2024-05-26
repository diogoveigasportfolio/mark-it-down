type BaseExplorerItemType = {
  id: string
  name: string
  isSelected: boolean
}

export type FileType = BaseExplorerItemType & {
  content: string
  isFavorite: boolean
  isOpen?: false
}

export type FolderType = BaseExplorerItemType & {
  isOpen: boolean
  children: FileType[]
}

export type ExplorerItemType = FolderType | FileType

export type SideBarSizesType = {
  sizes: number[]
  gutterSize: number
}

export type ExplorerInputType = {
  file: { isOpen: boolean; value: string }
  folder: { isOpen: boolean; value: string }
}

export type ToastState = {
  isOpen: boolean
  title: string
  message: string
  type: 'success' | 'warning' | 'error'
}

export type SelectedItemType = {
  item: ExplorerItemType | undefined
  isFolder: boolean
  parentName?: string
  parentId?: string
}

export type ToastType = 'success' | 'warning' | 'error'
