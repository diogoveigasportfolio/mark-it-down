import {
  HiOutlineFolderPlus,
  HiOutlineDocumentPlus,
  HiMiniArrowsPointingIn,
  HiEllipsisHorizontal
} from 'react-icons/hi2'

import { ExplorerInputType, ExplorerItemType } from '@renderer/typings'

import IconButton from '@/components/IconButton'
import { useMemo } from 'react'

type SideBarHeaderProps = {
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  findSelectedExplorerItem: (items: ExplorerItemType[]) => { item: ExplorerItemType | undefined; isFolder: boolean }
  items: ExplorerItemType[]
}

export default function SideBarHeader({ setCreationInput, findSelectedExplorerItem, items }: SideBarHeaderProps) {
  const selectedItem = useMemo(() => findSelectedExplorerItem(items), [items])

  function openFolderInput() {
    setCreationInput((prev) => ({ ...prev, folder: { isOpen: true, value: '' } }))
  }

  function openFileInput() {
    // Open file input only if a folder is selected
    if(selectedItem.item)
      setCreationInput((prev) => ({ ...prev, file: { isOpen: true, value: '' } }))
  }

  return (
    <section className="flex items-center gap-4 justify-end mt-16 pl-6 pr-2">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mr-auto text-nowrap">
        My Files
      </h1>
      <div className="flex items-center gap-2 text-neutral-750 dark:text-neutral-250">
        <IconButton onClick={openFileInput}>
          <HiOutlineDocumentPlus className="size-6 stroke-2" />
        </IconButton>
        <IconButton onClick={openFolderInput}>
          <HiOutlineFolderPlus className="size-6 stroke-2" />
        </IconButton>
        <IconButton>
          <HiMiniArrowsPointingIn className="size-6" />
        </IconButton>
        <IconButton>
          <HiEllipsisHorizontal className="size-6 stroke-1" />
        </IconButton>
      </div>
    </section>
  )
}
