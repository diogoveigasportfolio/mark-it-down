import useLocalStorage from '@renderer/hooks/useLocalStorage'
import useSideBarSizes from '@renderer/hooks/useSideBarSizes'
import { explorerData } from '@renderer/data/explorerData'
import { ExplorerItemType } from '@renderer/typings'

import { Footer, Header, Sidebar, Content } from './components'
import SplitManager from '@renderer/components/SplitManager'

function Settings() {
  const { sideBarSizes, sideBarIsOpen, onDragEnd } = useSideBarSizes()
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes', [
    ...explorerData
  ])

  return (
    <div className="h-full w-full overflow-y-hidden">
      <Header />
      <SplitManager onDragEnd={onDragEnd} sideBarSizes={sideBarSizes} sideBarIsOpen={sideBarIsOpen}>
        <Sidebar items={items} setItems={setItems} />
        <Content />
      </SplitManager>
      <Footer />
    </div>
  )
}

export default Settings
