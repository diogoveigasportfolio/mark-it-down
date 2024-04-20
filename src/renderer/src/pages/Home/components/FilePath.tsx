import { HiMiniChevronRight } from 'react-icons/hi2'

import { SelectedItemType } from '@renderer/typings'

type FilePathProps = {
  anySelected: boolean
  selectedItem: SelectedItemType
}

export function FilePath({ anySelected, selectedItem }: FilePathProps) {
  if (!anySelected) return <p>Click in a file to open it...</p>

  const path: string[] = []

  if (!selectedItem.isFolder) {
    path.push(selectedItem.parentName as string)
  }

  path.push(selectedItem.item?.name as string)

  return (
    <>
      {path.map((item, index) => (
        <span className="flex items-center" key={item}>
          {index !== 0 && (
            <HiMiniChevronRight className="size-6 stroke-2 text-neutral-900 dark:text-neutral-100" />
          )}
          <span className="text-lg text-neutral-900 dark:text-neutral-100">{item}</span>
        </span>
      ))}
    </>
  )
}
