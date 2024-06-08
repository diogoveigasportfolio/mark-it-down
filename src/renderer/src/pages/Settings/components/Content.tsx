import { useState } from 'react'

import { ColorSchemeSelector, SettingPair } from './'
import { ExplorerItemType, ToastType as ToastTypeType } from '@renderer/typings'
import Dialog from '@renderer/components/Popups/Dialog'
import Toast from '@renderer/components/Popups/Toast'

type DialogType = { isOpen: boolean; title: string; message: string; onClick: () => void }
type ToastType = { isOpen: boolean; title: string; message: string; type: ToastTypeType }

type ContentProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
}

export function Content({ setItems }: ContentProps) {
  const [dialog, setDialog] = useState<DialogType>({
    isOpen: false,
    title: '',
    message: '',
    onClick: () => {}
  })

  const [toast, setToast] = useState<ToastType>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  })

  const showDialog = (title: string, message: string, onClick: () => void) => {
    setDialog({ isOpen: true, title, message, onClick })
  }

  const closeDialog = () => {
    setDialog({ ...dialog, isOpen: false })
  }

  const showToast = (title: string, message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ isOpen: true, title, message, type })
  }

  const closeToast = () => {
    setToast({ ...toast, isOpen: false })
  }

  const clearLocalData = () => {
    localStorage.removeItem('notes')

    closeDialog()
    showToast('Local data cleared', 'Local data has been cleared.', 'success')
  }

  const clearLocalDataHandler = () => {
    showDialog(
      'Clear all local data',
      'Are you sure you want to clear all local data?',
      clearLocalData
    )
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
      showToast('Error importing data', 'The file must be a JSON file.', 'error')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const data = reader.result as string

      try {
        const parsedData: unknown = JSON.parse(data)

        if (!isExplorerItemType(parsedData)) {
          showToast('Error importing data', 'The data is not in the correct format.', 'error')
          return
        }

        localStorage.setItem('notes', JSON.stringify(parsedData))

        setItems(parsedData as unknown as ExplorerItemType[])
        showToast('Data imported', 'Data has been imported.', 'success')
      } catch (error) {
        showToast('Error importing data', 'An error occurred while importing data.', 'error')
      }
    }

    reader.readAsText(file)
  }

  return (
    <>
      {dialog.isOpen && (
        <Dialog title={dialog.title} onCancel={closeDialog} onConfirm={dialog.onClick}>
          {dialog.message}
        </Dialog>
      )}
      {toast.isOpen && (
        <Toast title={toast.title} type={toast.type} onClose={closeToast}>
          {toast.message}
        </Toast>
      )}
      <main className="h-full w-full bg-neutral-100 dark:bg-neutral-850 flex flex-col overflow-hidden space-y-12 px-16 py-8">
        <ColorSchemeSelector />
        <SettingPair
          text="Clear all local data"
          buttonText="Clear"
          onClick={clearLocalDataHandler}
        />
        <SettingPair text="Export data" buttonText="Export" onClick={exportLocalData} />
        <SettingPair
          text="Import data"
          buttonText="Import"
          isFile={true}
          onClick={importLocalData}
        />
        <SettingPair text="Download markdown file" buttonText="Download" onClick={() => {}} />
      </main>
    </>
  )
}

/**
 * * Both empty array or array with valid items is ok
 * @param obj - data from file
 * @returns boolean value, if the object is of type ExplorerItemType
 */
function isExplorerItemType(obj: unknown): obj is ExplorerItemType[] {
  const isArray = Array.isArray(obj)
  const isEmptyArray = isArray && obj.length === 0

  const isBaseExplorerItemType = (obj) =>
    typeof obj === 'object' &&
    'id' in obj &&
    typeof obj.id === 'string' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'isSelected' in obj &&
    typeof obj.isSelected === 'boolean'

  const isFileType = (obj) =>
    isBaseExplorerItemType(obj) &&
    'content' in obj &&
    typeof obj.content === 'string' &&
    'isFavorite' in obj &&
    typeof obj.isFavorite === 'boolean' &&
    ('isOpen' in obj ? obj.isOpen === false : true)

  const isFolderType = (obj) =>
    isBaseExplorerItemType(obj) &&
    'isOpen' in obj &&
    typeof obj.isOpen === 'boolean' &&
    'children' in obj &&
    Array.isArray(obj.children) &&
    obj.children.every(isFileType)

  const allItemsAreValid = isArray && obj.every((item) => isFileType(item) || isFolderType(item))

  return allItemsAreValid || isEmptyArray
}
