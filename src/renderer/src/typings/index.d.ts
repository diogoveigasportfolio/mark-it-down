export type PathItem = {
  id: string
  name: string
  content: string | undefined
  isFavorite: boolean
  children: PathItem[] | undefined
}
