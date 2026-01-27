export function BlackButton({title, icon, onClick}) {
  return (
    <button onClick={onClick} className="cursor-pointer shadow hover:scale-[1.01] py-2 flex items-center justify-center bg-black rounded-2xl">
      <p className="text-white">{title}</p>
      {icon}
    </button>
  )
}

export function GrayButton({title, icon, onClick}) {
  return (
    <button onClick={onClick} className="cursor-pointer shadow hover:scale-[1.01] py-2 flex items-center justify-center bg-gray-300 rounded-2xl">
      <p className="text-black">{title}</p>
      {icon}
    </button>
  )
}