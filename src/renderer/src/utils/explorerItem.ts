import { ExplorerItemType, SelectedItemType } from '../typings'

/**
 * * Both empty array or array with valid items is ok
 * @param obj - data from file
 * @returns boolean value, if the object is of type ExplorerItemType
 */
export function isExplorerItemType(obj: unknown): obj is ExplorerItemType[] {
  const isArray = Array.isArray(obj)
  const isEmptyArray = isArray && obj.length === 0

  const isBaseExplorerItemType = (obj) =>
    typeof obj === 'object' &&
    'id' in obj &&
    typeof obj.id === 'string' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'isSelected' in obj &&
    typeof obj.isSelected === 'boolean'

  const isFileType = (obj) =>
    isBaseExplorerItemType(obj) &&
    'content' in obj &&
    typeof obj.content === 'string' &&
    'isFavorite' in obj &&
    typeof obj.isFavorite === 'boolean' &&
    ('isOpen' in obj ? obj.isOpen === false : true)

  const isFolderType = (obj) =>
    isBaseExplorerItemType(obj) &&
    'isOpen' in obj &&
    typeof obj.isOpen === 'boolean' &&
    'children' in obj &&
    Array.isArray(obj.children) &&
    obj.children.every(isFileType)

  const allItemsAreValid = isArray && obj.every((item) => isFileType(item) || isFolderType(item))

  return allItemsAreValid || isEmptyArray
}

/**
 * * This function is used to find the selected item in the explorer
 * @param items - data from local storage in state
 * @returns the selected item in the explorer
 */
export function findSelectedExplorerItem(items: ExplorerItemType[]): SelectedItemType {
  const foundItem: ExplorerItemType | undefined = items.find(
    (item: ExplorerItemType) => item.isSelected
  )

  if (foundItem) {
    return { item: foundItem, isFolder: 'children' in foundItem, parentName: undefined }
  }

  const response: SelectedItemType = { item: undefined, isFolder: false }
  items.forEach((item) => {
    if ('children' in item) {
      const result = findSelectedExplorerItem(item.children)
      if (result.item) {
        response.item = result.item
        response.parentName = item.name
        response.parentId = item.id
      }
    }
  })

  return response
}
