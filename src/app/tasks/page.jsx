'use client'

import React, {useRef, useState} from "react";
import {
  BackIcon,
  ControlMouseIcon,
  DeleteIcon,
  EditIcon,
  FeatherIcon,
  LightingIcon,
  PlusIcon
} from "@/app/components/BaseIcons";
import {ErrorBox, InputTypeBox, LoadingBox, SelectItem, SelectTypeBox} from "@/app/components/BaseUI";
import useSWR from "swr";
import {Icon} from "@iconify/react";
import {GreenButton, RedButton, SimpleSwitch} from "@/app/components/Buttons";
import {DraggableDialogBox} from "@/app/FlareUI/Mobile/DialogBoxes";
import {BlackButton, GrayButton} from "@/app/FlareUI/Basic/Buttons";
import {MobileNavigation, MobileNavigationElement} from "@/app/FlareUI/Mobile/NavigationBars";
import {AccountIcon, CogIcon, HomeNavigationIcon, MoreActionsDots, TimeNavigationIcon} from "@/app/FlareUI/FlareIcons";
import {Tasks} from "@/app/tasks/TaskGroupComponent";

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/tasks/get`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingBox/>;
  if (data === undefined) return <ErrorBox>Tasks are not loaded</ErrorBox>;
  if (data.error !== undefined) return <ErrorBox>Some error: {data.error}</ErrorBox>;

  return (
      <section className="select-none md:w-1/4 flex flex-col w-full h-full bg-white">
        {/* Scenes */}
        <div className="grid grid-cols-2 p-2">
          <section className="py-2">
            <p className="text-xl">Buna, asd</p>
          </section>
        </div>
        <section className="flex-1 px-2 overflow-hidden">
          <p className="py-1 font-mono font-semibold">Actions</p>
          <Header/>
          <p className="py-1 font-mono font-semibold">Tasks</p>
          <Tasks data={data}/>
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

function Header({setMenu}) {
  return (
      <nav className="flex items-center gap-2">
        <div onClick={() => setMenu("create")} className="cursor-pointer gap-1 justify-center items-center flex-col flex">
          <div className="p-4 bg-stone-800 flex justify-center items-center rounded-lg drop-shadow aspect-square">
            <PlusIcon className="text-lg text-white"/>
          </div>
          <p>New task</p>
        </div>
        <div onClick={() => setMenu("create")} className="cursor-pointer gap-1 justify-center items-center flex-col flex">
          <div className="p-4 bg-stone-800 flex justify-center items-center rounded-lg drop-shadow aspect-square">
            <FeatherIcon className="text-lg text-white"/>
          </div>
          <p>Logs</p>
        </div>
        <div onClick={() => setMenu("create")} className="cursor-pointer gap-1 justify-center items-center flex-col flex">
          <div className="p-4 bg-stone-800 flex justify-center items-center rounded-lg drop-shadow aspect-square">
            <CogIcon className="text-lg text-white"/>
          </div>
          <p>Configure</p>
        </div>
      </nav>
  )
}

function AddNewTaskMenu({data, menu, setMenu}) {
  let groups = [];
  for (const group in data)
    groups.push(<SelectItem value={group} key={group} text={group}/>)
  return (
    <DraggableDialogBox onClose={() => setMenu("none")}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-neutral-900 text-2xl">Create a new task</h1>
      </div>
      <div className="px-5 mt-5 gap-2 flex flex-col w-full">
        <p className="text-sm">Create a new task that you want to run on a schedule</p>
        <SelectTypeBox id="group" title="Group">
          {groups}
          <SelectItem value="new_group" key="new_group" text={"New Group"}/>
        </SelectTypeBox>
        <InputTypeBox id="name" title="Task name" placeholder="Name"/>
      </div>
      <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
        <GrayButton onClick={() => setMenu("none")} title="Close"/>
        <BlackButton onClick={() => {
          fetcher(`/api/v1/tasks/delete?group=${args[1]}&task=${args[2]}`).then(r => setMenu("refresh"))
        }} title="Delete"/>
      </div>
    </DraggableDialogBox>
  )
}

function ChangeTaskMenu({data, menu, setMenu}) {
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
    });
    setMenu("edit_success");
  }
  let args = menu.split("|");
  let groups = [];
  for (const group in data)
    groups.push(<SelectItem value={group} key={group} text={group}/>)
  const task = data[args[1]].find(t => t.id === args[2]);
  let commands = [];
  for (const command of task.commands)
    commands.push(<InputTypeBox name="command" key={`cmd-${command}`} id={`cmd-${command}`} defaultText={command} placeholder="command"/>)
  return (
    <main className="z-10 absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-white/10 backdrop-blur">
      <div className={"lg:w-1/5 md:w-1/3 w-full mx-4 rounded-2xl flex flex-col justify-between items-center py-5 bg-white shadow-2xl"}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-neutral-900 text-2xl">Edit {args[2]}</h1>
        </div>
        <div className="px-5 mt-5 gap-2 flex flex-col w-full">
          <p className="text-sm">Edit this task</p>
          <SelectTypeBox id="group" defaultValue={args[1]} title="New group">
            {groups}
            <SelectItem value="new_group" key="new_group" text={"New Group"}/>
          </SelectTypeBox>
          <InputTypeBox id="name" title="Task name" defaultText={args[2]} placeholder="Name"/>
          <p>Schedule</p>
          <div className="flex gap-2">
            <SelectTypeBox id="when_run" defaultValue={args[1]} title="New group">
              <SelectItem value="everyday" key="everyday" text={"everyday"}/>
            </SelectTypeBox>
            <InputTypeBox id="when_time" title="Hour" defaultText={task.schedule.time} placeholder="00:00"/>
          </div>
          <p>Commands</p>
          <form id="cmd_form">
            {commands}
          </form>
        </div>
        <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
          <GrayButton onClick={() => setMenu("none")} title="Close"/>
          <GreenButton onClick={() => sendRequest()} title="Update"/>
        </div>
      </div>
    </main>
  )
}

function DeleteConfirmationMenu({menu, setMenu}) {
  let args = menu.split("|");
  return (
    <DraggableDialogBox onClose={() => setMenu("none")}>
      <div className="flex flex-col items-center justify-center">
        <DeleteIcon className="text-7xl text-green-400"/>
        <h1 className="font-bold text-neutral-900 text-2xl">Delete {args[2]}?</h1>
      </div>
      <p className="px-4 text-center text-neutral-600 pt-2">Confirm deletion of this task. This action is permanent and cannot be reversed.</p>
      <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
        <GrayButton onClick={() => setMenu("none")} title="Close"/>
        <BlackButton onClick={() => {
          fetcher(`/api/v1/tasks/delete?group=${args[1]}&task=${args[2]}`).then(r => setMenu("refresh"))
        }} title="Delete"/>
      </div>
    </DraggableDialogBox>
  )
}

