type CheckboxProps = {
  checked: boolean
  onChange?: (checked: boolean) => void
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e.target.checked)
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="form-checkbox size-5 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-500 dark:border-neutral-600 mr-1"
    />
  )
}

export default Checkbox
