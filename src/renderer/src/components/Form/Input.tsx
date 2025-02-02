type InputProps = {
  onBlur: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export default function Input({ onBlur, onChange, value }: InputProps) {
  return (
    <input
      type="text"
      onBlur={onBlur}
      autoFocus
      onFocus={(e) => e.target.select()}
      onChange={onChange}
      className="bg-neutral-250 dark:bg-neutral-850 border-1 border-neutral-150 dark:border-neutral-750 text-neutral-900 dark:text-neutral-100 w-full"
      defaultValue={value}
    />
  )
}
