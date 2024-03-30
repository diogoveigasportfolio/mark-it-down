import { nanoid } from 'nanoid'
import { FolderType } from '@renderer/typings'

export const explorerData: FolderType[] = [
  {
    id: nanoid(),
    name: 'Projects',
    children: [
      { id: nanoid(), name: 'YrQR', content: '# This is work', isFavorite: true },
      { id: nanoid(), name: 'Mark it down', content: '# This is pastime', isFavorite: true },
      {
        id: nanoid(),
        name: 'Portfolio',
        content: '**there is something that needs fixing**',
        isFavorite: false
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Ideas',
    children: [
      { id: nanoid(), name: 'New project', content: '# This is a new project', isFavorite: false },
      { id: nanoid(), name: 'App ideas', content: '# This is an app idea', isFavorite: false }
    ]
  },
  {
    id: nanoid(),
    name: 'Other notes',
    children: [
      { id: nanoid(), name: 'To do', content: '- Task 1\n- Task 2\n- Task 3', isFavorite: true },
      {
        id: nanoid(),
        name: 'Shopping list',
        content: '- Item 1\n- Item 2\n- Item 3',
        isFavorite: false
      }
    ]
  }
]
