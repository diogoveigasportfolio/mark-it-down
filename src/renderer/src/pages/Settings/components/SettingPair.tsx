type SettingPairProps = {
  text: string
  buttonText: string
  onClick: () => void
}

export function SettingPair({ text, buttonText, onClick }: SettingPairProps) {
  return (
    <div className="flex items-center">
      <span className="text-xl dark:text-neutral-250 text-neutral-850 min-w-64">{text}</span>
      <button
        type="button"
        className="min-w-32 min-h-9 dark:bg-neutral-650 bg-neutral-450 dark:text-neutral-250 text-neutral-850 rounded-md font-bold dark:hover:bg-neutral-600 hover:bg-neutral-400"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  )
}
