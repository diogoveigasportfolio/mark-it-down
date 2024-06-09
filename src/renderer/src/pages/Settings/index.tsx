import { useNavigate } from 'react-router-dom'

import useLocalStorage from '@renderer/hooks/useLocalStorage'
import useSideBarSizes from '@renderer/hooks/useSideBarSizes'
import { ExplorerItemType } from '@renderer/typings'

import { Footer, Header, Sidebar, Content } from './components'
import SplitManager from '@renderer/components/SplitManager'
import useKeydown from '@renderer/hooks/useKeydown'

function Settings() {
  const { sideBarSizes, sideBarIsOpen, onDragEnd } = useSideBarSizes()
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes')

  const navigate = useNavigate()

  // * Navigate to the home page
  useKeydown('Escape', () => {
    navigate(-1)
  })

  return (
    <div className="h-full w-full overflow-y-hidden">
      <Header />
      <SplitManager onDragEnd={onDragEnd} sideBarSizes={sideBarSizes} sideBarIsOpen={sideBarIsOpen}>
        <Sidebar items={items} setItems={setItems} />
        <Content items={items} setItems={setItems} />
      </SplitManager>
      <Footer />
    </div>
  )
}

export default Settings
