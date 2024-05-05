import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-neutral-150 dark:bg-neutral-800 w-auto min-h-16 flex items-center justify-center gap-3 px-4">
      <div className="group relative cursor-pointer">
        <Link to="https://diogoveigas.netlify.app/">
          <span className="text-xl text-neutral-800 dark:text-neutral-150">Diogo Veigas</span>
        </Link>
        <div className="absolute dark:bg-neutral-200 bg-neutral-750 h-1 w-4 group-hover:w-full transition-all" />
      </div>
    </footer>
  )
}
