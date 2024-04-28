import { useState } from 'react'

import Toast from '../Popups/Toast'

interface MarkdownLinkProps {
  children: React.ReactNode
  href: string
}

const MarkdownLink = ({ children, href }: MarkdownLinkProps) => {
  const [toastIsOpen, setToastIsOpen] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(href)
    setToastIsOpen(true)
  }

  function closeDialog() {
    setToastIsOpen(false)
  }

  const toastMessage = `Link copied to your clipboard.`

  return (
    <>
      <button
        onClick={handleCopy}
        className="underline underline-offset-3 text-blue-500 dark:text-blue-400 cursor-pointer font-medium px-2 rounded-lg"
      >
        {children}
      </button>
      {toastIsOpen && (
        <Toast title="Link Copied" type="success" onClose={closeDialog}>
          {toastMessage}
        </Toast>
      )}
    </>
  )
}

export default MarkdownLink
