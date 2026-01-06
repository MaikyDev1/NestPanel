import { Icon } from "@iconify/react";
import React, {useState} from "react";
import {GreenButton} from "@/app/components/Buttons";
import useSWR from "swr";
import {AnimatedLoadingIcon} from "@/app/components/BaseIcons";

export function LoadingContent() {
  return (
    <main className="h-full w-full">
      <AnimatedLoadingIcon className="text-2xl text-black/10 animate-pulse"/>
    </main>
  )
}

export function LoadingBox() {
  return <div className="bg-neutral-300 h-full rounded-t-2xl"><div className="w-full h-full bg-white rounded-t-2xl animate-pulse"></div></div>
}

export function ErrorBox({children}) {
  return (
    <main className="h-full w-full bg-white/10">
      {children}
    </main>
  )
}

export function InputTypeBox({id, title, placeholder, defaultText, error}) {
  return (
    <div className="w-full">
      {title ?
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor={id}>
          {title}
        </label> : null}
      <input className={(error ? "ring-2 ring-rose-600 text-rose-600 " : "focus:ring-2 focus:ring-amber-400 mb-2") + " appearance-none outline-none bg-neutral-100 w-full rounded py-2 px-3"}
             id={id} type="text" placeholder={placeholder} defaultValue={defaultText}/>
      {error ?
        <p className="text-red text-xs italic mt-1 text-rose-600">{error}</p> : null}
    </div>
  )
}

export function SelectTypeBox ({id, title, children, onChange}) {
  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor={id}>
        {title}
      </label>
      <select
        onChange={onChange}
        className="appearance-none outline-none bg-neutral-100 focus:ring-2 focus:ring-amber-400 w-full rounded py-2 px-3 mb-3"
        id={id}>
        {children}
      </select>
    </div>
  )
}

export function SelectItem({value, text, checked}) {
  return <option value={value} defaultChecked={checked}>{text}</option>
}


export function PopUp({icon, title, description, popup, setPopup}) {
  if (!popup) return null;
  return (
    <main className="z-10 absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-black/20 backdrop-blur">
      <div className={"lg:w-1/5 md:w-1/3 w-full mx-4 rounded-2xl flex flex-col justify-between items-center py-10 bg-white shadow-2xl"}>
        <div className="flex flex-col items-center justify-center">
          <Icon icon={icon} className="text-7xl text-green-400"/>
          <h1 className="font-bold text-neutral-900 text-2xl">{title}</h1>
        </div>
        <div className="pt-6">
          <GreenButton onClick={() => setPopup(false)} title="Close"/>
        </div>
      </div>
    </main>
  )
}