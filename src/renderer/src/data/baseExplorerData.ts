import { nanoid } from 'nanoid'

import { FolderType } from '@renderer/typings'
import { FAVORITE_FOLDER } from '@renderer/constants'

const favoritesFolder: FolderType = {
  id: FAVORITE_FOLDER,
  name: 'Favorites',
  isOpen: false,
  isSelected: false,
  children: []
}

export const baseExplorerData: FolderType[] = [favoritesFolder]
