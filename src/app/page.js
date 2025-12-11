'use client'

import useSWR from "swr";
import {
  ErrorBox,
  LoadingContent,
  SceneBoxUI,
  StatelessSceneBoxUI,
  StateSceneBoxUI,
  TestDeviceObject
} from "@/app/components/BaseUI";
import {Icon} from "@iconify/react";

export default function Home() {
    // get from backend
    return (
      <section className="select-none h-full md:w-1/4 w-full bg-indigo-700 flex flex-col">
        <Header/>
        {/* Scenes */}
        <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
          <div className="flex flex-col  w-full p-2">
            <h1 className="text-neutral-900 font-thin ml-2">Scenes</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
              <Scenes/>
            </div>
          </div>
          {/* Devices */}
          <div className="flex flex-col justify-center w-full p-2">
            <h1 className="text-neutral-900 font-thin ml-2">Nests</h1>
            <div className="grid md:grid-cols-2 grid-cols-2 gap-3">
              <Devices/>
            </div>
          </div>
        </div>
      </section>
    );
}

const fetcher = url => fetch(url).then(r => r.json())

function Header() {
  return (
    <div className="p-3">
      <div className="flex items-center p-3 gap-4">
        <div className="flex items-center p-3 gap-4">
          <Icon icon="duo-icons:dashboard" className="text-4xl text-white/50 ring ring-white/50 rounded-lg p-1"/>
          <div className="flex flex-col text-white">
            <p><span className="font-bold">Welcome</span> to NestHome</p>
            <p className="text-sm font-thin">Made by Maiky</p>
          </div>
        </div>

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
      <StatelessSceneBoxUI key={part.id} title={part.name} icon={part.icon} sceneId={part.id}/> :
      <StateSceneBoxUI currentState={part.current_state} key={part.id} title={part.name} icon={part.icon} sceneId={part.id}/>
    )
  })
  return html;
}

function Devices() {
  const {data, error, isLoading} = useSWR("/api/v1/devices/get", fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingContent/>;
  if (data === undefined) return <ErrorBox>Data is undifiend</ErrorBox>;
  let html = [];
  data.forEach(part => {
    html.push(
      <TestDeviceObject key={part.id} part={part}/>
    )
  })
  return html;
}