import { ExplorerInputType } from '@renderer/typings'
import {
  HiOutlineFolderPlus,
  HiOutlineDocumentPlus,
  HiMiniArrowsPointingIn,
  HiEllipsisHorizontal
} from 'react-icons/hi2'

import IconButton from '@/components/IconButton'

type SideBarHeaderProps = {
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
}

export default function SideBarHeader({ setCreationInput }: SideBarHeaderProps) {
  function openFolderInpout() {
    setCreationInput((prev) => ({ ...prev, folder: { isOpen: true, value: '' } }))
  }

  return (
    <section className="flex items-center gap-4 justify-end mt-16 pl-6 pr-2">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mr-auto text-nowrap">
        My Files
      </h1>
      <div className="flex items-center gap-2 text-neutral-750 dark:text-neutral-250">
        <IconButton>
          <HiOutlineDocumentPlus className="size-6 stroke-2" />
        </IconButton>
        <IconButton onClick={openFolderInpout}>
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
