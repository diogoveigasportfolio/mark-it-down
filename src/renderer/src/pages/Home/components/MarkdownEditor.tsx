import { MDXEditor, headingsPlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'

export function MarkdownEditor() {
  return (
      <MDXEditor
        markdown=""
        plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin()]}
        contentEditableClassName="overflow-auto outline-none max-w-none h-screen px-3 caret-yellow-500 prose prose-neutral dark:prose-invert prose-lg prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      />
  )
}
