import { HiMiniXMark } from 'react-icons/hi2'

import Button from '@/components/Form/Button'
import IconButton from './IconButton'

type DialogProps = {
  title: string
  children: React.ReactNode
  closeDialog: () => void
}

export default function Dialog({ title, children, closeDialog }: DialogProps) {
  return (
    <div className="z-10 absolute w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="z-20 max-w-90 min-h-24 bg-neutral-350 dark:bg-neutral-850 rounded-2xl">
        <div className="p-6 flex justify-between">
          <h1 className="text-xl text-neutral-800 dark:text-neutral-200 font-medum text-center">
            {title}
          </h1>
          <IconButton>
            <HiMiniXMark className="size-6 fill-neutral-300 dark:fill-neutral-600" />
          </IconButton>
        </div>
        <hr className="border-t border-t-neutral-600" />

        <div className="min-h-36 text-neutral-250 flex flex-col justify-center p-6">{children}</div>

        <hr className="border-t border-t-neutral-600" />
        <div className="flex justify-end gap-10 m-6">
          <Button variaton="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variaton="danger">Confirm</Button>
        </div>
      </div>
    </div>
  )
}
