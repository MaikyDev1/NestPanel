import useSWR from "swr";
import {Icon} from "@iconify/react";
import {GreenButton} from "@/app/components/Buttons";
import {useState} from "react";
import {PopUp} from "@/app/components/BaseUI";
import Link from "next/link";

const fetcher = url => fetch(url).then(r => r.json())

export function StatelessSceneBoxUI({title, description, icon, sceneId}) {
  const [popup, setPopup] = useState(false);
  async function turn() {
    const resp = await fetcher(`/api/v1/scenes/turn?scene=${sceneId}`)
    setPopup(true);
  }
  return (
    <div className="group cursor-pointer select-none hover:bg-amber-400/30 bg-neutral-400/10 text-neutral-800 flex flex-col justify-center h-20 w-full p-4 rounded-2xl">
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div id={sceneId} className="flex rounded-2xl items-center" onClick={turn}>
        <div className=" flex p-1 items-center justify-center flex-col">
          <Icon className="text-4xl grayscale group-hover:grayscale-0" icon={icon}/>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{title}</p>
          <p className="font-thin text-xs">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function StateSceneBoxUI({currentState, title, description, icon, sceneId}) {
  const [popup, setPopup] = useState(false);
  const [state, setState] = useState(currentState);
  async function turn() {
    const resp = await fetcher(`/api/v1/scenes/turn?scene=${sceneId}`)
    setState(Boolean(resp.state));
    setPopup(true);
  }
  return (
    <div className={`group cursor-pointer select-none hover:bg-amber-400/30 ${state ? "bg-amber-400/40" : "bg-neutral-400/10"} text-neutral-800 flex flex-col justify-center h-20 w-full p-4 rounded-2xl`}>
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div id={sceneId} className="flex rounded-2xl items-center" onClick={turn}>
        <div className=" flex p-1 items-center justify-center flex-col">
          <Icon className={`text-4xl ${state ? "grayscale-0" : "grayscale"} group-hover:grayscale-0`} icon={icon}/>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{title}</p>
          <p className="font-thin text-xs">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function NestBoxUI({meta, devices_count, nestId}) {
  return (
    <a href={`/${nestId}`} className={`group cursor-pointer select-none hover:bg-amber-400/30text-neutral-800 flex justify-center aspect-square w-full p-4 rounded-2xl`} style={{background: `${meta.color}20`}}>
      <div id={nestId} className="flex rounded-2xl gap-5 flex-col justify-center items-center">
        <div className="flex items-center justify-center flex-col rounded-full p-3" style={{background: `${meta.color}50`}}>
          <Icon className={`text-4xl`} style={{color: meta.color}} icon={meta.icon}/>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-sm">{meta.title}</p>
          <p className="font-thin text-xs">{devices_count === undefined ? "" : devices_count + " devices"}</p>
        </div>
      </div>
    </a>
  )
}
