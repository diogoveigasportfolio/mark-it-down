import { PathItem as PathItemType } from '@renderer/typings'
import PathItem from '@renderer/components/PathItem'

type FolderProps = {
  items: PathItemType[]
}

export default function Folders({ items }: FolderProps) {
  return (
    <section className="space-y-2">
      {items.map((item) => (
        <PathItem key={item.id} item={item} />
      ))}
    </section>
  )
}
