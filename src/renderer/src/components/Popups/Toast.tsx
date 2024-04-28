import { HiMiniXMark } from 'react-icons/hi2'

import IconButton from '../IconButton'

type ToastProps = {
  title: string
  children: React.ReactNode
  type?: 'success' | 'warning' | 'error'
  onClose: () => void
}

export default function Toast({ title, children, type = 'error', onClose }: ToastProps) {
  const typeEmoji = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌'

  setTimeout(() => {
    onClose()
  }, 5 * 1000)

  return (
    <div className="absolute w-96 h-28 bottom-8 right-8 bg-neutral-850 border border-neutral-900 dark:border-neutral-600 shadow-lg rounded-sm not-prose">
      <header className="flex items-center p-2">
        <h1 className="text-neutral-700 dark:text-neutral-300">
          {typeEmoji} {title}
        </h1>
        <IconButton className="ml-auto" onClick={onClose}>
          <HiMiniXMark className="size-6 fill-neutral-500 dark:fill-neutral-600" />
        </IconButton>
      </header>
      <hr className="border-t border-t-neutral-600" />
      <div className="text-neutral-600 dark:text-neutral-450 p-2">{children}</div>
    </div>
  )
}
