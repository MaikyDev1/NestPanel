import { Icon } from "@iconify/react";
import {useState} from "react";
import {GreenButton} from "@/app/components/Buttons";
import useSWR from "swr";
import {AnimatedLoadingIcon} from "@/app/components/BaseIcons";

export function LoadingContent() {
  return (
    <main className="h-full w-full">
      <AnimatedLoadingIcon className="text-3xl animate-pulse"/>
    </main>
  )
}

export function ErrorBox({children}) {
  return (
    <main className="h-full w-full bg-white/10">
      {children}
    </main>
  )
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