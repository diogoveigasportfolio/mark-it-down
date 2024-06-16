import { nanoid } from 'nanoid'
import { FolderType } from '@renderer/typings'

export const explorerData: FolderType[] = [
  {
    id: nanoid(),
    name: 'Projects',
    isSelected: false,
    isOpen: false,
    children: [
      {
        id: nanoid(),
        name: 'YrQR',
        content: '# This is work',
        isSelected: false,
        isFavorite: true
      },
      {
        id: nanoid(),
        name: 'Mark it down',
        content: '# This is pastime',
        isSelected: false,
        isFavorite: true
      },
      {
        id: nanoid(),
        name: 'Portfolio',
        content: '**there is something that needs fixing**',
        isSelected: false,
        isFavorite: false
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Ideas',
    isSelected: false,
    isOpen: false,
    children: [
      {
        id: nanoid(),
        name: 'New project',
        content: '# This is a new project',
        isSelected: false,
        isFavorite: false
      },
      {
        id: nanoid(),
        name: 'App ideas',
        content: '# This is an app idea',
        isSelected: false,
        isFavorite: false
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Other notes',
    isSelected: false,
    isOpen: false,
    children: [
      {
        id: nanoid(),
        name: 'To do',
        content: '- Task 1\n- Task 2\n- Task 3',
        isSelected: false,
        isFavorite: true
      },
      {
        id: nanoid(),
        name: 'Shopping list',
        content: '- Item 1\n- Item 2\n- Item 3',
        isSelected: false,
        isFavorite: false
      }
    ]
  }
]
