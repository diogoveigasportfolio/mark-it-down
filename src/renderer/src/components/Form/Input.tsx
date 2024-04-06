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
      onChange={onChange}
      className="bg-neutral-850 border-1 border-neutral-750 text-neutral-100 w-full"
      defaultValue={value}
    />
  )
}
