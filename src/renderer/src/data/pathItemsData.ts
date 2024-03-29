import { nanoid } from 'nanoid'
import { PathItem } from '@renderer/typings'

export const pathItemsData: PathItem[] = [
  {
    id: nanoid(),
    name: 'Projects',
    content: undefined,
    isFavorite: false,
    children: [
      {
        id: nanoid(),
        name: 'Electron',
        content: undefined,
        isFavorite: false,
        children: [
          {
            id: nanoid(),
            name: 'mark-it-down.md',
            content:
              '# This is a title\n ## This is a smaller header\n ```this.is.a.codeblock()```',
            isFavorite: false,
            children: undefined
          }
        ]
      },
      {
        id: nanoid(),
        name: 'React',
        content: undefined,
        isFavorite: false,
        children: []
      },
      {
        id: nanoid(),
        name: 'JavaScript',
        content: undefined,
        isFavorite: false,
        children: []
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Physical Exercise',
    content: undefined,
    isFavorite: false,
    children: []
  },
  {
    id: nanoid(),
    name: 'Etc...',
    content: undefined,
    isFavorite: false,
    children: []
  }
]
