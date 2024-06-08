import { toast } from 'sonner'

interface MarkdownLinkProps {
  children: React.ReactNode
  href: string
}

const MarkdownLink = ({ children, href }: MarkdownLinkProps) => {
  // const [toastIsOpen, setToastIsOpen] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(href)
    toast.success('Link copied to your clipboard.')
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className="underline underline-offset-3 text-blue-500 dark:text-blue-400 cursor-pointer font-medium px-2 rounded-lg"
      >
        {children}
      </button>
    </>
  )
}

export default MarkdownLink
