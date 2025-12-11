import { Icon } from "@iconify/react";
import {useState} from "react";
import {GreenButton} from "@/app/components/Buttons";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json())

export function StatelessSceneBoxUI({title, description, icon, sceneId}) {
  const [popup, setPopup] = useState(false);
  async function turn() {
    const resp = await fetcher(`/api/v1/scenes/turn?scene=${sceneId}`)
    setPopup(true);
  }
  return (
    <div className="cursor-pointer select-none hover:bg-neutral-700/30 flex flex-col justify-center items-center h-20 w-20 rounded-2xl">
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div id={sceneId} className="flex rounded-2xl items-center justify-center"
           onClick={turn}>
        <div className="flex p-1 items-center justify-center flex-col">
          <Icon className="text-4xl" icon={icon}/>
        </div>
      </div>
      <p className="font-semibold mt-1 text-sm">{title}</p>
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
    <div className={"cursor-pointer select-none hover:bg-neutral-700/30 flex flex-col justify-center items-center h-20 w-20 rounded-2xl " + (state ? "bg-amber-400/60" : "")}>
      <PopUp icon="line-md:confirm-circle" setPopup={setPopup} popup={popup} title={`${title} was runned`}/>
      <div id={sceneId} className={"flex rounded-2xl items-center justify-center "}
           onClick={turn}>
        <div className="flex p-1 items-center justify-center flex-col">
          <Icon className="text-4xl" icon={icon}/>
        </div>
      </div>
      <p className="font-semibold text-sm">{title}</p>
    </div>
  )
}

export function TestDeviceObject({part}) {
  const {data, error, isLoading} = useSWR(`/api/v1/devices/run?device=${part.id}&action=get_state`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingContent/>;
  if (data === undefined) return <ErrorBox>Data is undifiend</ErrorBox>;
  return (
    <div key={part.id}>
      <p>{part.id}</p>
      <p>{data.state}</p>
    </div>
  )
}

export function LoadingContent() {
  return (
    <main className="h-full w-full bg-white/10">
      Loading...
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
    <main className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-black/20 backdrop-blur">
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