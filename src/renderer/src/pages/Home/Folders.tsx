import { CreationInputType, ExplorerItemType } from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'
import usePointerPos from '@renderer/hooks/usePointerPos'
import { useRef, useState } from 'react'
import { cn } from '@renderer/utils'
import MenuOptions from '@renderer/components/RightClickMenu/MenuOptions'
import MenuOption from '@renderer/components/RightClickMenu/MenuOption'
import Input from '@renderer/components/Input'
import { nanoid } from 'nanoid'

type FoldersProps = {
  items: ExplorerItemType[]
  handleToggleFolder: (id: string) => void
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  creationInput: CreationInputType
  setCreationInput: React.Dispatch<React.SetStateAction<CreationInputType>>
}

export default function Folders({
  items,
  handleToggleFolder,
  menuOpen,
  setMenuOpen,
  creationInput,
  setCreationInput
}: FoldersProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const coords = usePointerPos()

  function handleBackgroundRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()

    if (!menuRef.current) return

    menuRef.current.style.left = `${coords.x}px`
    menuRef.current.style.top = `${coords.y}px`

    setMenuOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    items.push({
      id: nanoid(),
      name: creationInput.folder.value,
      isOpen: false,
      isSelected: false,
      children: []
    })

    setCreationInput((prev) => ({ ...prev, folder: { isOpen: false, value: '' } }))
  }

  return (
    <section className="h-full relative">
      <div className="h-full overflow-auto" onAuxClick={handleBackgroundRightClick}>
        <div className="space-y-2">
          {creationInput.folder.isOpen && (
            <form onSubmit={handleSubmit}>
              <Input
                onChange={(e) =>
                  setCreationInput((prev) => ({
                    ...prev,
                    folder: { isOpen: true, value: e.target.value }
                  }))
                }
                onBlur={() => {
                  setCreationInput((prev) => ({
                    ...prev,
                    folder: { isOpen: false, value: '' }
                  }))
                }}
              />
            </form>
          )}
          {items.map((item) => (
            <ExplorerItem key={item.id} item={item} handleToggleFolder={handleToggleFolder} />
          ))}
        </div>
      </div>
      <MenuOptions ref={menuRef} menuOpen={menuOpen}>
        <MenuOption
          text="New folder.."
          clickHandler={() =>
            setCreationInput((prev) => ({
              ...prev,
              folder: { isOpen: true, value: '' }
            }))
          }
        />
      </MenuOptions>
    </section>
  )
}
