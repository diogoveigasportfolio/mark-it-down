import useLocalStorage from '@renderer/hooks/useLocalStorage'
import useSideBarSizes from '@renderer/hooks/useSideBarSizes'
import { explorerData } from '@renderer/data/explorerData'
import { ExplorerItemType } from '@renderer/typings'

import { Footer, Header, Sidebar } from './components'
import { SplitManager } from '../Home/components'

function Settings() {
  const { sideBarSizes, sideBarIsOpen, onDragEnd } = useSideBarSizes()
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes', [
    ...explorerData
  ])

  return (
    <>
      <Header />
      <SplitManager onDragEnd={onDragEnd} sideBarSizes={sideBarSizes} sideBarIsOpen={sideBarIsOpen}>
        <Sidebar items={items} setItems={setItems} />
        <section className="h-full bg-neutral-100 dark:bg-neutral-850 w-auto flex flex-col overflow-hidden">
          Content will be here...
        </section>
      </SplitManager>
      <Footer />
    </>
  )
}

export default Settings
