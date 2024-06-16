/**
 * @file
 * This file contains utility functions that are widely used in a big range of other files.
 *
 * The functions in this file can be used to perform operations such as:
 * - Merge class names, as well as conditionally aplly them
 *
 */

import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
