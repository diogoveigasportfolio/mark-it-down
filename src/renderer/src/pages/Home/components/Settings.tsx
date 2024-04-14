import { HiOutlineCog6Tooth } from 'react-icons/hi2'

export function Settings() {
  return (
    <button className="text-lg text-neutral-750 dark:text-neutral-250 w-full min-h-16 bg-gradient-to-r from-60% from-neutral-200 dark:from-neutral-850 to-neutral-250 dark:to-neutral-900 hover:from-neutral-150 hover:dark:from-neutral-800 active:from-neutral-100 active:dark:from-neutral-750 mt-auto">
      <span className="flex pl-6 items-center gap-4">
        <HiOutlineCog6Tooth className="size-6" /> Settings
      </span>
    </button>
  )
}
