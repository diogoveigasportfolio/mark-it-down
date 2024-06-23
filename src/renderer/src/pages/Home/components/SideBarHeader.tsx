import {
  HiEllipsisHorizontal,
  HiMiniArrowsPointingIn,
  HiMiniArrowsPointingOut,
  HiOutlineDocumentPlus,
  HiOutlineFolderPlus
} from 'react-icons/hi2'

import { ExplorerInputType, ExplorerItemType, SelectedItemType } from '@renderer/typings'

import IconButton from '@/components/IconButton'
import ToolTip from '@renderer/components/ToolTip'

type SideBarHeaderProps = {
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  selectedItem: SelectedItemType
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
}

export function SideBarHeader({
  setCreationInput,
  selectedItem,
  setItems,
  items
}: SideBarHeaderProps) {
  const allFoldersAreCollapsed = items.every((folder) => folder.isOpen === false)

  function openFolderInput() {
    setCreationInput((prev) => ({ ...prev, folder: { isOpen: true, value: '' } }))
  }

  function openFileInput() {
    // Open file input only if a folder is selected
    if (selectedItem.isFolder)
      setCreationInput((prev) => ({ ...prev, file: { isOpen: true, value: '' } }))
  }

  function collapseAll() {
    setItems((folders) => {
      return folders.map((folder) => {
        return { ...folder, isOpen: false }
      })
    })
  }

  function openAll() {
    setItems((folders) => {
      return folders.map((folder) => {
        const children = 'children' in folder ? folder.children : []
        return { ...folder, children: children, isOpen: true }
      })
    })
  }

  function handleCollapse() {
    if (allFoldersAreCollapsed) {
      openAll()
    } else {
      collapseAll()
    }
  }

  const collapseIcon = allFoldersAreCollapsed ? (
    <HiMiniArrowsPointingOut className="size-6" />
  ) : (
    <HiMiniArrowsPointingIn className="size-6" />
  )

  const collapseToolTip = allFoldersAreCollapsed ? 'Expand all' : 'Collapse all'

  return (
    <section className="flex items-center gap-4 justify-end mt-16 pl-6 pr-2">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mr-auto text-nowrap">
        My Files
      </h1>
      <div className="flex items-center gap-2 text-neutral-750 dark:text-neutral-250">
        <ToolTip text="New file..." onClick={openFileInput}>
          <IconButton onClick={openFileInput}>
            <HiOutlineDocumentPlus className="size-6 stroke-2" />
          </IconButton>
        </ToolTip>
        <ToolTip text="New folder..." onClick={openFolderInput}>
          <IconButton onClick={openFolderInput}>
            <HiOutlineFolderPlus className="size-6 stroke-2" />
          </IconButton>
        </ToolTip>
        <ToolTip text={collapseToolTip} onClick={handleCollapse}>
          <IconButton onClick={handleCollapse}>{collapseIcon}</IconButton>
        </ToolTip>
        <ToolTip text="Unavailable..." position="right">
          <IconButton>
            <HiEllipsisHorizontal className="size-6 stroke-1" />
          </IconButton>
        </ToolTip>
      </div>
    </section>
  )
}
