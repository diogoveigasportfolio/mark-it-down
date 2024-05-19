export function ColorSchemeSelector() {
  return (
    <div className="flex items-center">
      <label htmlFor="color-scheme" className="text-xl dark:text-neutral-250 text-neutral-850 min-w-64">Color Scheme</label>
      <select className="min-w-32 dark:bg-neutral-650 bg-neutral-450 dark:text-neutral-250 text-neutral-850 rounded-md border-none focus:ring-2 hover:cursor-pointer font-semibold form-select" name="color-scheme" id="color-scheme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
