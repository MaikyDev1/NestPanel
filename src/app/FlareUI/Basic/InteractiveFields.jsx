import React from "react";

export function InputTypeBox({id, title, name, placeholder, defaultText, error}) {
    return (
        <div className="w-full">
            {title ?
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor={id}>
                    {title}
                </label> : null}
            <input name={name} className={(error ? "ring-2 ring-rose-600 text-rose-600 " : "focus:ring-2 focus:ring-amber-400 mb-2") + " appearance-none outline-none bg-zinc-200 w-full rounded py-2 px-3"}
                   id={id} type="text" placeholder={placeholder} defaultValue={defaultText}/>
            {error ?
                <p className="text-red text-xs italic mt-1 text-rose-600">{error}</p> : null}
        </div>
    )
}

export function SelectTypeBox ({id, title, defaultValue, children, onChange}) {
    return (
        <div className="w-full">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor={id}>
                {title}
            </label>
            <select
                onChange={onChange}
                defaultValue={defaultValue}
                className="appearance-none outline-none bg-zinc-200 focus:ring-2 focus:ring-amber-400 w-full rounded py-2 px-3 mb-3"
                id={id}>
                {children}
            </select>
        </div>
    )
}

export function SelectItem({value, text, checked}) {
    return <option value={value} defaultChecked={checked}>{text}</option>
}