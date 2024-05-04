import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import useKeydown from '@renderer/hooks/useKeydown'
import { ExplorerItemType, FileType, SelectedItemType } from '@renderer/typings'
import MarkdownLink from '@renderer/components/Markdown/MarkdownLink'
import Checkbox from '@renderer/components/Form/Checkbox'

type MarkdownEditorProps = {
  selectedItem: SelectedItemType | undefined
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export function MarkdownEditor({ selectedItem, setItems, isEditing, setIsEditing }: MarkdownEditorProps) {
  useKeydown('Escape', () => setIsEditing(false))

  const item = selectedItem?.item

  if (item === undefined || selectedItem?.isFolder) return

  const markdown = (item as FileType).content

  const handleChange = (markdown: string = '') => {
    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if ('children' in folder) {
          const updatedChildren = folder.children.map((file) => {
            if (file.id === item.id) {
              return { ...file, content: markdown }
            }
            return file
          })
          return { ...folder, children: updatedChildren }
        }
        return folder
      })
    })
  }

  return (
    <div className="cursor-text" onDoubleClick={() => setIsEditing(true)}>
      {!isEditing && (
        <div className="mx-auto overflow-auto outline-none h-screen px-12 py-8 lg:px-24 prose prose-neutral dark:prose-invert prose-lg prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] select-text pb-32 w-full">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // @ts-ignore - did not find type definition for props at docs
              a(props: { href: string; children: React.ReactNode }) {
                const { href, children } = props

                if (!children) return null

                return <MarkdownLink href={href}>{children}</MarkdownLink>
              },
              // @ts-ignore - did not find type definition for props at docs
              input(props: { checked: boolean; type: string }) {
                const {type, checked} = props

                if (type === 'checkbox') {
                  return <Checkbox checked={checked} />
                }
              }
            }}
          >
            {markdown}
          </Markdown>
        </div>
      )}
      {isEditing && (
        <div>
          <textarea
            value={markdown}
            onBlur={() => setIsEditing(false)}
            autoFocus
            onChange={(e) => handleChange(e.target.value)}
            className="mx-auto overflow-auto outline-none h-screen w-full caret-blue-500 text-neutral-800 dark:text-neutral-200 bg-transparent border-none px-12 py-8 lg:px-24 text-xl pb-32"
          />
        </div>
      )}
    </div>
  )
}
