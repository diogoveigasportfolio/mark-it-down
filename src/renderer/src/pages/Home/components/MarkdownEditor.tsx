import { useRef } from 'react'
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'

import { ExplorerItemType, FileType, FolderType, SelectedItemType } from '@renderer/typings'

type MarkdownEditorProps = {
  selectedItem: SelectedItemType | undefined
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
}

export function MarkdownEditor({ selectedItem, setItems }: MarkdownEditorProps) {
  const mdxEditorRef = useRef<MDXEditorMethods>(null)
  const item = selectedItem?.item

  if (item === undefined || selectedItem?.isFolder) return

  const content = (item as FileType).content

  mdxEditorRef.current?.setMarkdown(content)

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
    <MDXEditor
      ref={mdxEditorRef}
      markdown={content}
      onChange={handleChange}
      placeholder="Start typing here..."
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        linkPlugin()
      ]}
      contentEditableClassName="overflow-auto outline-none max-w-none h-screen px-3 caret-blue-500 prose prose-neutral dark:prose-invert prose-lg prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
