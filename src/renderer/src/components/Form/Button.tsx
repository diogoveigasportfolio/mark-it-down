import { cn } from '@renderer/utils'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variaton?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variaton = 'secondary',
  size = 'medium'
}: ButtonProps) {
  function getVariation() {
    switch (variaton) {
      case 'primary':
        return 'bg-blue-600 hover:bg-opacity-85 text-white border-2 border-transparent'
      case 'secondary':
        return 'bg-neutral-500 hover:bg-opacity-85 border-2 border-transparent dark:border-neutral-450 text-white'
      case 'danger':
        return 'bg-red-600 hover:bg-opacity-85 text-white border-2 border-transparent'
    }
  }

  function getSize() {
    switch (size) {
      case 'small':
        return 'min-w-12 min-h-4 py-1 px-2'
      case 'medium':
        return 'min-w-16 min-h-8 py-3 px-6'
      case 'large':
        return 'min-w-24 min-h-12 py-5 px-10'
    }
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-xl shadow-md ${cn(getVariation())} ${cn(getSize())}`}
    >
      <span className="">{children}</span>
    </button>
  )
}
