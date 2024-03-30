import { ExplorerItemType } from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'

type FoldersProps = {
  items: ExplorerItemType[]
}

export default function Folders({ items }: FoldersProps) {
  return (
    <section className="space-y-2">
      {items.map((item) => (
        <ExplorerItem key={item.id} item={item} />
      ))}
    </section>
  )
}
