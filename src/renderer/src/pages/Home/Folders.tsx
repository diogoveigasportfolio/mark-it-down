import { ExplorerItemType, FolderType } from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'

type FoldersProps = {
  items: ExplorerItemType[]
  handleToggleFolder: (id: string) => void
}

export default function Folders({ items, handleToggleFolder }: FoldersProps) {
  return (
    <section className="h-full overflow-auto">
      <div className="space-y-2">
        {items.map((item) => (
          <ExplorerItem key={item.id} item={item} handleToggleFolder={handleToggleFolder} />
        ))}
      </div>
    </section>
  )
}
