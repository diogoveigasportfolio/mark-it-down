import { ColorSchemeSelector, SettingPair } from './'

export function Content() {
  return (
    <main className="h-full w-full bg-neutral-100 dark:bg-neutral-850 flex flex-col overflow-hidden space-y-12 px-16 py-8">
      <ColorSchemeSelector />
      <SettingPair text="Clear all local data" buttonText="Clear" onClick={() => {}} />
      <SettingPair text="Export data" buttonText="Export" onClick={() => {}} />
      <SettingPair text="Import data" buttonText="Import" onClick={() => {}} />
      <SettingPair text="Download markdown file" buttonText="Download" onClick={() => {}} />
    </main>
  )
}
