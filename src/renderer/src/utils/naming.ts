/**
 * @file
 * This file contains utility functions for manipulating and validating names.
 *
 * The functions in this file can be used to perform operations such as:
 * - Checking if a name is valid
 * - Formatting a name in a specific way
 *
 */

function validCharacterLimits(name: string): string {
  name = name.trim()

  if (name.length > 30) {
    throw new Error('Chosen name is too long')
  }

  if (name.length <= 1) {
    throw new Error('Chosen name is too small')
  }

  return name
}

export function nameIsValid(name: string): boolean {
  const trimmedName = validCharacterLimits(name)

  const folderNameRegExp = /^[^\\/:*?"<>|]+$/

  const isValidFolderName = folderNameRegExp.test(trimmedName)

  return isValidFolderName
}

export function formatFolderName(name: string): string {
  let isValid = false

  try {
    isValid = nameIsValid(name)
  } catch (error) {
    throw new Error((error as Error).message)
  }

  if (!isValid) {
    throw new Error('Folder name is invalid')
  }

  return name.trim()
}

export function formatFileName(name: string): string {
  if (!nameIsValid(name)) {
    throw new Error('File name is invalid')
  }

  const pathEnd = '.md'

  const parts = name.trim().split('.')
  if (parts.length === 1) {
    return parts[0] + pathEnd
  }

  if (parts.at(-1) == 'md') {
    return name
  }

  return name + pathEnd
}

export function formatDuplicateFileName(name: string): string {
  const parts = name.split('.')
  if (parts.length === 1) {
    return `${name}-copy.md`
  }

  return `${parts[0]}-copy.${parts[1]}`
}
