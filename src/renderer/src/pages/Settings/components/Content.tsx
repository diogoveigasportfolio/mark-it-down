import { toast } from 'sonner'

import { ColorSchemeSelector, SettingPair } from './'
import { ExplorerItemType, FileType } from '@renderer/typings'
import { findSelectedExplorerItem, isExplorerItemType } from '@renderer/utils/explorerItem'
import { getClonedUndoArray } from '@renderer/utils/array'

type ContentProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
}

export function Content({ items, setItems }: ContentProps) {
  const clearLocalData = () => {
    const clonedItems = getClonedUndoArray(items)
    setItems([])

    toast('You cleared the local storage', {
      action: {
        label: 'Undo',
        onClick: () => {
          setItems(clonedItems)
        }
      }
    })
  }

  const exportLocalData = () => {
    const data = localStorage.getItem('notes') || ''
    const blob = new Blob([data], { type: 'application/json' })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.setAttribute('download', 'notes.json')

    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const importLocalData = (event) => {
    const file = event.target.files[0]

    if (file.type !== 'application/json') {
      toast.error('Error importing data', { description: 'The file must be a JSON file.' })
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const data = reader.result as string

      try {
        const parsedData: unknown = JSON.parse(data)

        if (!isExplorerItemType(parsedData)) {
          toast.error('Error importing data', {
            description: 'The data is not in the correct format.'
          })
          return
        }

        localStorage.setItem('notes', JSON.stringify(parsedData))

        setItems(parsedData as unknown as ExplorerItemType[])
        toast.success('Data imported', { description: 'Data has been imported.' })
      } catch (error) {
        toast.error('Error importing data', {
          description: 'An error occurred while importing data.'
        })
      } finally {
        event.target.value = null
      }
    }

    reader.readAsText(file)
  }

  const exportMarkdown = () => {
    const selectedNote = findSelectedExplorerItem(items)
    if (selectedNote.item === undefined || selectedNote.isFolder) {
      toast.error('Error exporting markdown', {
        description: 'Please select a note to export.'
      })

      return
    }

    const { content, name } = selectedNote.item as FileType

    const blob = new Blob([content], { type: 'text/markdown' })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.setAttribute('download', name)

    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <>
      <main className="h-full w-full bg-neutral-100 dark:bg-neutral-850 flex flex-col overflow-hidden space-y-12 px-16 py-8">
        <ColorSchemeSelector />
        <SettingPair text="Clear all local data" buttonText="Clear" onClick={clearLocalData} />
        <SettingPair text="Export data" buttonText="Export" onClick={exportLocalData} />
        <SettingPair
          text="Import data"
          buttonText="Import"
          isFile={true}
          onClick={importLocalData}
        />
        <SettingPair text="Download markdown file" buttonText="Download" onClick={exportMarkdown} />
      </main>
    </>
  )
}
