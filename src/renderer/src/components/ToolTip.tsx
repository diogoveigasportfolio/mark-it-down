type ToolTipProps = {
  children: React.ReactNode
  text: string
  position?: 'top' | 'right'
  onClick?: () => void
}

export default function ToolTip({ children, text, position = 'top', onClick }: ToolTipProps) {
  const positionClasses = positionMap(position)

  return (
    <div className="group/tooltip relative">
      {children}
      <span className={positionClasses} onClick={onClick}>
        {text}
      </span>
    </div>
  )
}

function positionMap(position: string) {
  switch (position) {
    case 'top':
      return 'absolute cursor-pointer -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 p-2 rounded-md shadow-md z-10 hidden group-hover/tooltip:block opacity-0 group-hover/tooltip:opacity-100 min-w-32 text-center text-sm before:content-[""] before:absolute before:left-1/2 before:top-[100%] before:-translate-x-1/2 before:border-[9px] before:border-x-transparent before:border-b-transparent before:border-t-neutral-300 dark:before:border-t-neutral-700 after:content-[""] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-neutral-50 dark:after:border-t-neutral-900'
    case 'right':
      return 'absolute cursor-pointer top-1/2 left-full transform -translate-y-[55%] translate-x-2 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 p-2 rounded-md shadow-md z-10 hidden group-hover/tooltip:block opacity-0 group-hover/tooltip:opacity-100 min-w-32 text-center text-sm before:content-[""] before:absolute before:right-[100%] before:top-1/2 before:-translate-y-1/2 before:border-[9px] before:border-y-transparent before:border-l-transparent before:border-r-neutral-300 dark:before:border-r-neutral-700 after:content-[""] after:absolute after:right-[100%] after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-y-transparent after:border-l-transparent after:border-r-neutral-50 dark:after:border-r-neutral-900'
    default:
      return ''
  }
}
