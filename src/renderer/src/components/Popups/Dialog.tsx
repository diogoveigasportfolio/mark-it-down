import { HiMiniXMark } from 'react-icons/hi2'

import Button from '@/components/Form/Button'
import IconButton from '../IconButton'

type DialogProps = {
  title: string
  children: React.ReactNode
  onCancel: () => void
  onConfirm: () => void
}

export default function Dialog({ title, children, onCancel, onConfirm }: DialogProps) {
  return (
    <div className="z-10 fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
      <div onClick={onCancel} className="fixed top-0 left-0 right-0 bottom-0 w-full h-full" />
      <div className="z-20 min-w-[500px] min-h-24 bg-neutral-150 dark:bg-neutral-850 rounded-2xl border border-neutral-900 dark:border-neutral-600">
        <header className="p-6 flex justify-between">
          <h1 className="text-xl text-neutral-800 dark:text-neutral-200 font-medum text-center font-medium">
            {title}
          </h1>
          <IconButton onClick={onCancel}>
            <HiMiniXMark className="size-6 fill-neutral-500 dark:fill-neutral-600" />
          </IconButton>
        </header>
        <hr className="border-t border-t-neutral-600" />

        <div className="min-h-36 text-neutral-750 dark:text-neutral-250 flex flex-col justify-center p-6 items-center">
          <div className="space-y-1">{children}</div>
        </div>

        <hr className="border-t border-t-neutral-600" />
        <div className="flex justify-end gap-10 m-6">
          <Button variaton="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button autoFocus={true} onClick={onConfirm} variaton="danger">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
