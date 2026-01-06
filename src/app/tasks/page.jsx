'use client'

import React, {useState} from "react";
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
import {GrayButton, GreenButton, RedButton, SimpleSwitch} from "@/app/components/Buttons";

const fetcher = url => fetch(url).then(r => r.json())

export default function Page() {
  const [menu, setMenu] = useState("none");
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/tasks/get`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingBox/>;
  if (data === undefined) return <ErrorBox>Tasks are not loaded</ErrorBox>;
  if (data.error !== undefined) return <ErrorBox>Some error: {data.error}</ErrorBox>;

  if (menu.includes("refresh")) mutate().then(() => setMenu("none"))

  let menuObject = null;
  if (menu.includes("create"))
    menuObject = <AddNewTaskMenu data={data} setMenu={setMenu} menu={menu}/>
  else if (menu.includes("delete"))
    menuObject = <DeleteConfirmationMenu menu={menu} setMenu={setMenu}/>
  else if (menu.includes("edit"))
    menuObject = <ChangeTaskMenu menu={menu} setMenu={setMenu}/>
  return (
    <section className="select-none h-full md:w-1/4 w-full bg-indigo-700 flex flex-col">
      {menuObject}
      <Header setMenu={setMenu}/>
      <Tasks menu={menu} data={data} setMenu={setMenu}/>
    </section>
  )
}

function Header({setMenu}) {
  return (
    <div className="p-6">
      <div className="flex flex-col justify-center gap-4">
        <a href="/" className="flex items-center gap-4">
          <BackIcon className="text-4xl text-white/50 ring ring-white/50 rounded-lg p-1"/>
          <div className="flex flex-col text-white">
            <p><span className="font-bold">Welcome</span> to NestHome</p>
            <p className="text-sm font-thin">Made by Maiky</p>
          </div>
        </a>
        <nav className="grid grid-cols-2 gap-2">
          <div onClick={() => setMenu("create")} className="cursor-pointer bg-white text-gray-800 gap-2 py-2 rounded-xl flex justify-center items-center">
            <PlusIcon className="text-lg"/>
            <p>Add new task</p>
          </div>
          <div className="cursor-pointer bg-white text-gray-800 gap-2 py-2 rounded-xl flex justify-center items-center">
            <FeatherIcon className="text-lg"/>
            <p>See timings</p>
          </div>
        </nav>
      </div>
    </div>
  )
}

function AddNewTaskMenu({data, menu, setMenu}) {
  let groups = [];
  for (const group in data)
    groups.push(<SelectItem value={group} key={group} text={group}/>)
  return (
    <main className="z-10 absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-white/10 backdrop-blur">
      <div className={"lg:w-1/5 md:w-1/3 w-full mx-4 rounded-2xl flex flex-col justify-between items-center py-10 bg-white shadow-2xl"}>
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
          <GreenButton onClick={() => {
            fetcher(`/api/v1/tasks/delete?group=${args[1]}&task=${args[2]}`).then(r => setMenu("refresh"))
          }} title="Delete"/>
        </div>
      </div>
    </main>
  )
}

function ChangeTaskMenu({setMenu}) {

}

function DeleteConfirmationMenu({menu, setMenu}) {
  let args = menu.split("|");
  return (
    <main className="z-10 absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-white/10 backdrop-blur">
      <div className={"lg:w-1/5 md:w-1/3 w-full mx-4 rounded-2xl flex flex-col justify-between items-center py-10 bg-white shadow-2xl"}>
        <div className="flex flex-col items-center justify-center">
          <DeleteIcon className="text-7xl text-green-400"/>
          <h1 className="font-bold text-neutral-900 text-2xl">Delete {args[2]}?</h1>
        </div>
        <p className="px-4 text-center text-neutral-600 pt-2">Confirm deletion of this task. This action is permanent and cannot be reversed.</p>
        <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
          <GreenButton onClick={() => setMenu("none")} title="Close"/>
          <RedButton onClick={() => {
            fetcher(`/api/v1/tasks/delete?group=${args[1]}&task=${args[2]}`).then(r => setMenu("refresh"))
          }} title="Delete"/>
        </div>
      </div>
    </main>
  )
}

function Tasks({data, menu, setMenu}) {
  let content = [];
  for (const groupId in data) {
    content.push(<TaskGroup key={groupId} groupId={groupId} setMenu={setMenu} tasks={data[groupId]}/>);
  }
  return (
    <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
      <div className="flex flex-col  w-full p-2">
        {content}
      </div>
    </div>
  )
}

function TaskGroup({groupId, tasks, setMenu}) {
  let content = [];
  for (const task of tasks) {
    content.push(<TaskInterface key={task.id} groupId={groupId} task={task} setMenu={setMenu}/>);
  }
  return (
    <div>
      <h1 className="text-neutral-900 font-thin text-lg ml-2">Tasks of {groupId}</h1>
      <div className="grid grid-cols-2 gap-3">
        {content}
      </div>
    </div>
  )
}

function TaskInterface({task, groupId, setMenu}) {
  return (
    <div className="bg-neutral-100 p-3 rounded-2xl">
      <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Task name:</p>
      <p className="text-xs font-mono font-bold text-gray-800/80">{task.id}</p>
      <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Timing</p>
      <p className="text-xs font-mono font-bold text-gray-800/80">everyday at {task.schedule.time}</p>
      <nav className="grid grid-cols-2 gap-2 mt-2 w-full">
        <div onClick={() => setMenu(`edit|${groupId}|${task.id}`)} className="cursor-pointer flex items-center gap-1 justify-center text-emerald-600 bg-green-100 rounded-lg p-1">
          <EditIcon className="text-xl text-emerald-600"/>
          <p className="text-xs font-mono font-bold">Edit</p>
        </div>
        <div onClick={() => setMenu(`delete|${groupId}|${task.id}`)} className="cursor-pointer flex items-center gap-1 justify-center text-red-500 bg-red-100 rounded-lg p-1">
          <DeleteIcon className="text-xl text-red-500"/>
          <p className="text-xs font-mono font-bold">Delete</p>
        </div>
      </nav>
    </div>
  )
}