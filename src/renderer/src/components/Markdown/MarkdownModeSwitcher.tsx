import { HiMiniPencilSquare, HiEye } from 'react-icons/hi2'

import IconButton from '../IconButton'

type MarkdownModeSwitcher = {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const MarkdownModeSwitcher = ({ isEditing, setIsEditing }: MarkdownModeSwitcher) => {
  return (
    <section className="space-x-1 ml-auto mr-4">
      <IconButton disabled={!isEditing} onClick={() => setIsEditing(false)}>
        <HiEye className="fill-neutral-600 dark:fill-neutral-350" size={35} />
      </IconButton>
      <IconButton disabled={isEditing} onClick={() => setIsEditing(true)}>
        <HiMiniPencilSquare className="fill-neutral-600 dark:fill-neutral-350" size={35} />
      </IconButton>
    </section>
  )
}

export default MarkdownModeSwitcher
