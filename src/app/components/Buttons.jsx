export function RedButton ({ title, ...restProps }) {
  return (
    <button {...restProps}
            className="py-2 px-3 select-none font-semibold text-red-950 hover:border-b-red-600 hover:bg-red-700 transition duration-300 text rounded-2xl bg-red-600 border-b-2 border-b-red-500">
      {title}
    </button>
  )
}

export function GreenButton ({ title, ...restProps }) {
  return (
    <button {...restProps}
            className="py-2 px-3 select-none font-semibold text-green-950 hover:border-b-green-600 hover:bg-green-700 transition duration-300 text rounded-2xl bg-green-600 border-b-2 border-b-green-500">
      {title}
    </button>
  )
}

export function SimpleSwitch({color, id, defaultChecked, onChange}) {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer select-none text-neutral-900"
           style={{ "--injected-accent-color": `${color}80`,
             "--injected-base-color": `${color}60`}}>
      <div className="relative">
        <input type="checkbox" onChange={onChange} id={id} defaultChecked={defaultChecked} className="peer sr-only"/>
        <div className="block h-8 rounded-full bg-gray-300 peer-checked:bg-[var(--injected-base-color)] w-14"></div>
        <div
          className="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1 peer-checked:translate-x-full peer-checked:bg-[var(--injected-accent-color)]">
        </div>
      </div>
    </label>
  )
}