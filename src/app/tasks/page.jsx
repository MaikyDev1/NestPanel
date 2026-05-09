'use client'

import React, {useState} from "react";
import {
  FeatherIcon,
  PlusIcon
} from "@/app/components/BaseIcons";
import {ErrorBox, InputTypeBox, LoadingBox, SelectAndInput, SelectItem, SelectTypeBox} from "@/app/components/BaseUI";
import useSWR from "swr";
import {DraggableDialogBox} from "@/app/FlareUI/Mobile/DialogBoxes";
import {BlackButton, GrayButton} from "@/app/FlareUI/Basic/Buttons";
import {MobileNavigation, MobileNavigationElement} from "@/app/FlareUI/Mobile/NavigationBars";
import {
  AccountIcon,
  CogIcon,
  HomeNavigationIcon,
  IconByTemperature,
  MoreActionsDots,
  TimeNavigationIcon
} from "@/app/FlareUI/FlareIcons";
import {EditCommandsList, Tasks} from "@/app/tasks/TaskGroupComponent";

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/tasks/get`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingBox/>;
  if (data === undefined) return <ErrorBox>Tasks are not loaded</ErrorBox>;
  if (data.error !== undefined) return <ErrorBox>Some error: {data.error}</ErrorBox>;

  return (
    <section className="select-none md:w-1/4 p-4 flex flex-col gap-1 w-full h-full bg-white">
      {/* Scenes */}
      <div className="flex flex-col py-2 px-1 text-stone-800">
        <p className="text-lg font-bold">Nest Tasks</p>
        <p className="text-sm font-thin">Here you are able to <b>create</b>, <b>edit</b>, <b>schedule</b> actions to run at some time.</p>
      </div>
      <section className="flex-1 overflow-hidden">
        <Header groupList={Object.keys(data)} mutate={mutate}/>
        {/*<p className="py-1 font-mono font-semibold">Tasks</p>*/}
        <Tasks data={data} mutate={mutate}/>
      </section>
      <MobileNavigation defaultActive={1}>
        <MobileNavigationElement href="/" icon={<HomeNavigationIcon/>} index={0}/>
        <MobileNavigationElement icon={<TimeNavigationIcon/>} index={1}/>
        <MobileNavigationElement icon={<CogIcon/>} index={2}/>
        <MobileNavigationElement icon={<AccountIcon/>} index={3}/>
      </MobileNavigation>
    </section>
  );
}

function Header({groupList, mutate}) {
  const [action, setAction] = new useState("none");
  if (action === "success") {
    mutate();
    setAction("none");
  }
  return (
      <nav className="items-center gap-2 p-1 rounded-xl bg-stone-200 grid grid-cols-3">
        {(action === "create") ? <AddNewTaskMenu allGroups={groupList} setAction={setAction}/> : null}
        <div onClick={() => setAction("create")} className={`flex items-center justify-center gap-2 rounded-lg p-2 text-center bg-stone-800 grow text-white`}>
          <PlusIcon className="text-lg text-white"/> New
        </div>
        <div onClick={() => setAction("Logs")} className={`flex items-center justify-center gap-2 rounded-lg p-2 text-center bg-stone-800 grow text-white`}>
          <FeatherIcon className="text-lg text-white"/> Logs
        </div>
        <div onClick={() => setAction("create")} className={`flex items-center justify-center gap-2 rounded-lg p-2 text-center bg-stone-800 grow text-white`}>
          <CogIcon className="text-lg text-white"/> Change
        </div>
      </nav>
  )
}

function AddNewTaskMenu({allGroups, setAction}) {
  async function sendRequest() {
    const form = document.getElementById("cmd_form");
    const formData = new FormData(form);
    const payload = {
      id: document.getElementById("name").value,
      group: document.getElementById("group").value,
      schedule: {
        time: document.getElementById("when_time").value,
      },
      commands: formData.getAll("command"),
    }
    const res = await fetch("api/v1/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then((e) => setAction("success"));
  }
  return (
    <DraggableDialogBox onClose={() => setAction("none")}>
      <form id="cmd_form" className="w-full px-10 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-neutral-900 text-2xl">Create new task</h1>
        </div>
        <div className="mt-5 gap-2 flex flex-col w-full">
          <p className="text-stone-500 font-semibold">Basic Information</p>
          <div className="bg-stone-200 px-3 py-2 gap-2 rounded-lg">
            <SelectAndInput options={allGroups} placeholder="group" title="Task group" id="group"/>
            <InputTypeBox id="name" title="Task name" placeholder="Name"/>
          </div>
          <p className="text-stone-500 font-semibold">Schedule</p>
          <div className="bg-stone-200 px-3 py-2 rounded-lg">
            <div className="flex gap-2">
              <SelectTypeBox id="when_run" title="New group">
                <SelectItem value="everyday" key="everyday" text={"everyday"}/>
              </SelectTypeBox>
              <InputTypeBox id="when_time" title="Hour" placeholder="00:00"/>
            </div>
          </div>
          <p className="text-stone-500 font-semibold">Commands</p>
          <div className="bg-stone-200 px-3 flex flex-col py-2 rounded-lg">
            <EditCommandsList/>
          </div>
        </div>
      </form>
      <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
        <GrayButton onClick={() => setAction("none")} title="Close"/>
        <BlackButton onClick={() => sendRequest()} title="Confirm"/>
      </div>
    </DraggableDialogBox>
  )
}
