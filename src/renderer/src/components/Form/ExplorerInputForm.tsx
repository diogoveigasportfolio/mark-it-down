import { ExplorerInputType } from '@renderer/typings'
import Input from './Input'

type target = 'file' | 'folder'

type ExplorerInputFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setExplorerInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  target: target
  currentValue?: string
}

export default function ExplorerInputForm({
  handleSubmit,
  setExplorerInput,
  target,
  currentValue
}: ExplorerInputFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={currentValue || ''}
        onChange={(e) =>
          setExplorerInput((prev) => ({
            ...prev,
            [target]: { isOpen: true, value: e.target.value }
          }))
        }
        onBlur={() => {
          setExplorerInput((prev) => ({
            ...prev,
            [target]: { isOpen: false, value: '' }
          }))
        }}
      />
    </form>
  )
}
