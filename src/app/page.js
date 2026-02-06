'use client'

import useSWR from "swr";
import {
  ErrorBox,
  LoadingContent, PopUp
} from "@/app/components/BaseUI";
import {Icon} from "@iconify/react";
import {ControlMouseIcon, FeatherIcon, LightingIcon, TemperatureIcon} from "@/app/components/BaseIcons";
import {useState} from "react";
import {CogIcon, HomeNavigationIcon, IconByTemperature} from "@/app/FlareUI/FlareIcons";
import {MobileNavigation} from "@/app/FlareUI/Mobile/NavigationBars";

export default function Home() {
  const [display, setDisplay] = useState("devices");
  return (
    <section className="select-none md:w-1/4 flex flex-col w-full h-full bg-white">
      {/* Scenes */}
      <div className="grid grid-cols-2 p-2">
        <section className="p-2">
          <p className="text-xl">Buna, Pam</p>
        </section>
        <div className="bg-stone-800 col-span-2 rounded-2xl p-3">
          <div className="text-white text-3xl font-bold flex justify-between">
            <div>
              <p>-42ºC</p>
              <p className="text-lg font-mono">Good</p>
            </div>
            <IconByTemperature temperature={10} className="relative -translate-x-1 -translate-y-1 text-5xl"/>
          </div>
          <p className="text-stone-400 text-sm">Outside humidity 54%</p>
          <div className="flex text-sm mt-2 justify-between">
            <div className="text-white">
              <p className="font-bold text-white">Indoor temp</p>
              <p className="text-stone-400">22ºC</p>
            </div>
            <div className="text-white">
              <p className="font-bold text-white">Humidity</p>
              <p className="text-stone-400">67%</p>
            </div>
            <div className="text-white">
              <p className="font-bold text-white">Air Quality</p>
              <p className="text-stone-400">NaN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-1 mx-2 bg-gray-200 gap-1 p-1 col-span-2 rounded-xl">
        <div onClick={() => setDisplay("devices")} className={`rounded-lg p-1 text-center ${display === "devices" ? "bg-stone-800 grow text-white" : "bg-white grow text-black"}`}>
          Nests
        </div>
        <div onClick={() => setDisplay("nests")} className={`rounded-lg p-1 text-center ${display === "nests" ? "bg-stone-800 grow text-white" : "bg-white grow text-black"}`}>
          Scenes
        </div>
      </div>
      <section className="flex-1 overflow-hidden">
        {display === "devices" ?
          <div className="grid grid-cols-2 p-2 gap-1 h-full overflow-y-auto">
            <Nests/>
          </div> :
          <div className="grid grid-cols-2 p-2 gap-1 h-full overflow-y-auto">
            <Scenes/>
          </div>
        }
      </section>
      <MobileNavigation/>
    </section>
  );
}

const fetcher = url => fetch(url).then(r => r.json())

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
  if (data === {}) return <p>No data was forwarded!</p>
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
    <div className="aspect-square bg-zinc-200 rounded-[2rem] p-5 flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between">
        <Icon className={`text-5xl bg-white p-2 text-stone-800 rounded-full`} icon={meta.icon}/>
      </div>
      <div>
        <p>{meta.title}</p>
        <p className="font-thin text-xs">{devices_count === undefined ? "Stanalone" : devices_count + " devices"}</p>
      </div>
    </div>
  )
  // return (
  //   <a href={`/${nestId}`} className={`group cursor-pointer select-none hover:bg-amber-400/30text-neutral-800 flex justify-center aspect-square w-full p-4 rounded-2xl`} style={{background: `${meta.color}20`}}>
  //     <div id={nestId} className="flex rounded-2xl gap-5 flex-col justify-center items-center">
  //       <div className="flex items-center justify-center flex-col rounded-full p-3" style={{background: `${meta.color}50`}}>
  //         <Icon className={`text-4xl`} style={{color: meta.color}} icon={meta.icon}/>
  //       </div>
  //       <div className="flex flex-col justify-center items-center">
  //         <p className="font-semibold text-sm">{meta.title}</p>
  //         <p className="font-thin text-xs">{devices_count === undefined ? "" : devices_count + " devices"}</p>
  //       </div>
  //     </div>
  //   </a>
  // )
}
