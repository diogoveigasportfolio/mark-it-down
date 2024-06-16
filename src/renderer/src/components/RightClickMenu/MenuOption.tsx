type MenuOptionProps = {
  text: string
  clickHandler: (e: React.MouseEvent<HTMLLIElement>) => void
}

export default function MenuOption({ text, clickHandler }: MenuOptionProps) {
  return (
    <li
      className="text-neutral-800 dark:text-neutral-100 hover:bg-neutral-350 dark:hover:bg-neutral-700 py-2 px-4 cursor-pointer rounded-md"
      onClick={clickHandler}
    >
      {text}
    </li>
  )
}
