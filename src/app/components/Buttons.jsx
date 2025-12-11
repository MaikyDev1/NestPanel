export function RedButton ({ title, ...restProps }) {
  return (
    <button {...restProps}
            className="py-2 px-3 select-none font-semibold text-red-950 hover:border-b-red-600 hover:bg-red-700 transition duration-300 text rounded-lg bg-red-600 border-b-2 border-b-red-500">
      {title}
    </button>
  )
}

export function GreenButton ({ title, ...restProps }) {
  return (
    <button {...restProps}
            className="py-2 px-3 select-none font-semibold text-green-950 hover:border-b-green-600 hover:bg-green-700 transition duration-300 text rounded-lg bg-green-600 border-b-2 border-b-green-500">
      {title}
    </button>
  )
}
