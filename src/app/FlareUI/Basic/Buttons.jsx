export function BlackButton({title, icon, onClick}) {
  return (
    <button onClick={onClick} type="button" className="cursor-pointer shadow hover:scale-[1.01] py-2 flex items-center justify-center bg-black rounded-xl">
      <p className="text-white">{title}</p>
      {icon}
    </button>
  )
}

export function GrayButton({title, icon, onClick}) {
  return (
    <button onClick={onClick} type="button" className="cursor-pointer shadow hover:scale-[1.01] py-2 flex items-center justify-center bg-stone-300 rounded-xl">
      <p className="text-black">{title}</p>
      {icon}
    </button>
  )
}