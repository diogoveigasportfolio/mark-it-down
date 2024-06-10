/**
 * @file
 * This file contains utility functions for manipulating arrays, more specifically, files and folders.
 *
 * The functions in this file can be used to perform operations such as:
 * - Ordering files/folders by name
 *
 */

import { ExplorerItemType, FileType, FolderType } from '@renderer/typings'
import { FAVORITE_FOLDER } from '@renderer/constants'
import _ from 'lodash'

export function orderFoldersByName(items: FolderType[]): FolderType[] {
  // const favorite = items[0];

  const otherFolders = items.slice(1).sort((a, b) => a.name.localeCompare(b.name))

  return [...otherFolders]
}

export function orderFilesByName(items: FileType[]): FileType[] {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}

export function getClonedUndoArray(items: ExplorerItemType[]): ExplorerItemType[] {
  const clonedItems = _.cloneDeep(items)
  const notFavoriteItems = clonedItems.filter((item) => item.id !== FAVORITE_FOLDER)

  return notFavoriteItems
}
