import { useState } from 'react'

import { ColorSchemeSelector, SettingPair } from './'
import { ToastType as ToastTypeType } from '@renderer/typings'
import Dialog from '@renderer/components/Popups/Dialog'
import Toast from '@renderer/components/Popups/Toast'

type DialogType = { isOpen: boolean; title: string; message: string; onClick: () => void }
type ToastType = { isOpen: boolean; title: string; message: string; type: ToastTypeType }

export function Content() {
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
        <SettingPair text="Export data" buttonText="Export" onClick={() => {}} />
        <SettingPair text="Import data" buttonText="Import" onClick={() => {}} />
        <SettingPair text="Download markdown file" buttonText="Download" onClick={() => {}} />
      </main>
    </>
  )
}
