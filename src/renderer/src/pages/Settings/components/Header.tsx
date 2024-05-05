import { HiOutlineXCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="bg-neutral-150 dark:bg-neutral-800 w-auto min-h-16 flex items-center gap-3 px-4">
      <Link to="/">
        <HiOutlineXCircle
          className="text-neutral-550 dark:text-neutral-450 hover:text-neutral-750 hover:dark:text-neutral-250"
          size={40}
        />
      </Link>
      <h1 className="text-xl text-neutral-800 dark:text-neutral-150">Settings</h1>
    </div>
  )
}
