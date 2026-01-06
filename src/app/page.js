'use client'

import useSWR from "swr";
import {
  ErrorBox,
  LoadingContent, PopUp
} from "@/app/components/BaseUI";
import {Icon} from "@iconify/react";
import {ControlMouseIcon, FeatherIcon, LightingIcon, TemperatureIcon} from "@/app/components/BaseIcons";
import {useState} from "react";

export default function Home() {
    return (
      <section className="select-none h-full md:w-1/4 w-full bg-indigo-700 flex flex-col">
        <Header/>
        {/* Scenes */}
        <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
          <div className="flex flex-col  w-full p-2">
            <h1 className="text-neutral-900 font-thin ml-2">Scenes</h1>
            <div className="grid grid-cols-2 gap-3">
              <Scenes/>
            </div>
          </div>
          {/* Devices */}
          <div className="flex flex-col justify-center w-full p-2">
            <h1 className="text-neutral-900 font-thin ml-2">Nests</h1>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Nests/>
            </div>
          </div>
        </div>
      </section>
    );
}

const fetcher = url => fetch(url).then(r => r.json())

function Header() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="p-6">
      {!popup ? null :
        <div className="absolute select none left-0 z-50 flex flex-col w-full items-center bg-white/10 backdrop-blur top-0 h-full">
          <nav className="mt-6 flex flex-col justify-center md:w-[23%] w-full gap-2 items-center bg-gray-700/90 backdrop-blur-sm rounded-2xl p-3">
            <a href="/tasks" className="cursor-pointer flex w-2/3 p-2 justify-center items-center gap-3">
              <LightingIcon className="text-yellow-400 text-4xl"/>
              <p className="font-mono text-white font-bold">Tasks</p>
            </a>
            <div className="cursor-pointer flex w-2/3 border-t-neutral-500 border-t p-3 justify-center items-center gap-3">
              <ControlMouseIcon className="text-red-300 text-4xl"/>
              <p className="font-mono text-white font-bold">Devices</p>
            </div>
            <div className="cursor-pointer flex w-2/3 border-t-neutral-500 border-t p-3 justify-center items-center gap-3">
              <FeatherIcon className="text-blue-300 text-4xl"/>
              <p className="font-mono text-white font-bold">Nests</p>
            </div>
            <div onClick={() => setPopup(false)} className="cursor-pointer flex w-2/3 justify-center items-center bg-indigo-700 p-2 rounded-2xl gap-3">
              <p className="font-mono text-white font-bold">Exit</p>
            </div>
          </nav>
        </div>
      }
      <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <Icon icon="duo-icons:dashboard" className="text-4xl text-white/50 ring ring-white/50 rounded-lg p-1" onClick={() => setPopup(true)}/>
          <div className="flex flex-col text-white">
            <p><span className="font-bold">Welcome</span> to NestHome</p>
            <p className="text-sm font-thin">Made by Maiky</p>
          </div>
        </div>
      {/* Examples */}
        <nav className="flex justify-between px-4">
          {/* Temperature */}
          <div className="flex items-center flex-col">
            <div className="flex items-center text-2xl text-white">
              <p className="font-bold font-mono">0</p>
              <TemperatureIcon className="text-3xl"/>
            </div>
            <p className="text-white font-normal text-sm">Bedroom temp</p>
          </div>
          {/* Some state */}
          <div className="flex items-center flex-col">
            <div className="flex items-center text-2xl text-white">
              <p className="font-bold font-mono">0</p>
              <TemperatureIcon className="text-3xl"/>
            </div>
            <p className="text-white font-normal text-sm">Outside temp</p>
          </div>
          {/* Current consumtion */}
          <div className="flex items-center flex-col">
            <div className="flex items-center text-2xl text-white">
              <p className="font-bold font-mono">0.0KW</p>
            </div>
            <p className="text-white font-normal text-sm">Home consumtion</p>
          </div>
        </nav>
      </div>
    </div>
  )
}

function Scenes() {
  const {data, error, isLoading} = useSWR("/api/v1/scenes/get", fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingContent/>;
  if (data === undefined) return <ErrorBox>Data is undifiend</ErrorBox>;
  let html = [];
  data.forEach(part => {
    html.push(part.scene_type === "STATELESS" ?
      <StatelessSceneBoxUI key={part.id} title={part.name} description={part.description} icon={part.icon} sceneId={part.id}/> :
      <StateSceneBoxUI currentState={part.current_state} description={part.description} key={part.id} title={part.name} icon={part.icon} sceneId={part.id}/>
    )
  })
  return html;
}

function Nests() {
  const {data, error, isLoading} = useSWR("/api/v1/nests/get", fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingContent/>;
  if (data === undefined) return <ErrorBox>Data is undifiend</ErrorBox>;
  let html = [];
  data.forEach(part => {
    html.push(
      <NestBoxUI key={part.id} meta={part.meta} devices_count={part.devices_count} nestId={part.id}/>
    )
  })
  return html;
}

export function StatelessSceneBoxUI({title, description, icon, sceneId}) {
  const [popup, setPopup] = useState(false);
  async function turn() {
    const resp = await fetcher(`/api/v1/scenes/turn?scene=${sceneId}`)
    setPopup(true);
  }
  return (
    <div>
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div onClick={turn} className="group cursor-pointer select-none hover:bg-amber-400/30 bg-neutral-400/10 text-neutral-800 flex flex-col justify-center h-20 w-full p-4 rounded-2xl">
        <div id={sceneId} className="flex rounded-2xl items-center">
          <div className=" flex p-1 items-center justify-center flex-col">
            <Icon className="text-4xl grayscale group-hover:grayscale-0" icon={icon}/>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{title}</p>
            <p className="font-thin text-xs">{description}</p>
          </div>
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
    <div>
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div onClick={turn} className={`group cursor-pointer select-none hover:bg-amber-400/30 ${state ? "bg-amber-400/40" : "bg-neutral-400/10"} text-neutral-800 flex flex-col justify-center h-20 w-full p-4 rounded-2xl`}>
        <div id={sceneId} className="flex rounded-2xl items-center">
          <div className=" flex p-1 items-center justify-center flex-col">
            <Icon className={`text-4xl ${state ? "grayscale-0" : "grayscale"} group-hover:grayscale-0`} icon={icon}/>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{title}</p>
            <p className="font-thin text-xs">{description}</p>
          </div>
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
