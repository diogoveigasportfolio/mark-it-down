/**
 * @file
 * This file contains utility functions for manipulating and validating names.
 *
 * The functions in this file can be used to perform operations such as:
 * - Checking if a name is valid
 * - Formatting a name in a specific way
 *
 */

export function nameIsValid(name: string): boolean {
  return /^[a-zA-Z0-9\s._-]+(\.[a-zA-Z0-9\s._-]+)?$/.test(name.trim())
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
