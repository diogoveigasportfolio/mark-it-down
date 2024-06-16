import { useId } from 'react'

type SettingPairProps = {
  text: string
  buttonText: string
  onClick: (event?) => void
  isFile?: boolean
}

export function SettingPair({ text, buttonText, onClick, isFile }: SettingPairProps) {
  const fileId = useId()

  const button = (
    <button
      type="button"
      className="min-w-32 min-h-9 dark:bg-neutral-650 bg-neutral-250 dark:text-neutral-250 text-neutral-850 rounded-md font-bold dark:hover:bg-neutral-600 hover:bg-neutral-300"
      onClick={onClick}
    >
      {buttonText}
    </button>
  )

  const fileInput = (
    <>
      <label
        htmlFor={fileId}
        className="min-w-32 min-h-9 dark:bg-neutral-650 bg-neutral-250 dark:text-neutral-250 text-neutral-850 rounded-md font-bold dark:hover:bg-neutral-600 hover:bg-neutral-300 flex justify-center items-center cursor-pointer"
      >
        <span>{buttonText}</span>
      </label>
      <input id={fileId} type="file" onChange={onClick} className="hidden" accept=".json" />
    </>
  )

  return (
    <div className="flex items-center">
      <span className="text-xl dark:text-neutral-250 text-neutral-850 min-w-64">{text}</span>
      {isFile ? fileInput : button}
    </div>
  )
}
