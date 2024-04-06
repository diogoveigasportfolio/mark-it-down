import { cn } from "@renderer/utils"

type IconButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function IconButton({ children, onClick, className }: IconButtonProps) {
  return (
    <button
      className={`hover:bg-neutral-350 hover:dark:bg-neutral-750 p-1 rounded-md ${cn(className)}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
