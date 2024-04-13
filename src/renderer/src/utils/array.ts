/**
 * @file
 * This file contains utility functions for manipulating arrays, more specifically, files and folders.
 *
 * The functions in this file can be used to perform operations such as:
 * - Ordering files/folders by name
 *
 */

import { FileType, FolderType } from "@renderer/typings"

export function orderFoldersByName(items: FolderType[]): FolderType[] {
  const favorite = items[0];
  
  const otherFolders = items.slice(1).sort((a, b) => a.name.localeCompare(b.name));

  return [favorite, ...otherFolders];
}

export function orderFilesByName(items: FileType[]): FileType[] {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}