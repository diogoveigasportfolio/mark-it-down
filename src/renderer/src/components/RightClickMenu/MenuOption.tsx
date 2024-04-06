type MenuOptionProps = {
  text: string
  clickHandler: (e: React.MouseEvent<HTMLLIElement>) => void
}

export default function MenuOption({ text, clickHandler }: MenuOptionProps) {
  return (
    <li
      className="text-neutral-800 dark:text-neutral-100 hover:bg-gray-400 dark:hover:bg-gray-800 p-1 cursor-pointer rounded-sm"
      onClick={clickHandler}
    >
      {text}
    </li>
  )
}
