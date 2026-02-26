import React, {useState} from "react";
import {MoreActionsDots} from "@/app/FlareUI/FlareIcons";
import {DeleteIcon, EditIcon} from "@/app/components/BaseIcons";
import {InputTypeBox, SelectItem, SelectTypeBox} from "@/app/components/BaseUI";
import {BlackButton, GrayButton} from "@/app/FlareUI/Basic/Buttons";
import {GreenButton} from "@/app/components/Buttons";
import {DraggableDialogBox} from "@/app/FlareUI/Mobile/DialogBoxes";
import { useRouter } from "next/navigation";

export function Tasks({data}) {
    let content = [];
    const allGroups = Object.keys(data)
    for (const groupId in data) {
        content.push(<TaskGroup key={groupId} groupId={groupId} allGroups={allGroups} tasks={data[groupId]}/>);
    }
    return (
        <div className="bg-white rounded-t-2xl flex flex-col flex-grow">
            <div className="flex flex-col w-full">
                {content}
            </div>
        </div>
    )
}

function TaskGroup({allGroups, groupId, tasks}) {
    let content = [];
    for (const task of tasks) {
        content.push(<TaskInterface key={task.id} groupId={groupId} task={task} allGroups={allGroups}/>);
    }
    return (
        <div>
            <div className="text-neutral-900 mb-1 font-thin flex justify-between pr-3 text-md">
                <p>Tasks of {groupId}</p>
                <div className="px-2 bg-stone-300 flex justify-center items-center rounded-2xl">
                    <MoreActionsDots className="text-lg"/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {content}
            </div>
        </div>
    )
}

function TaskInterface({task, allGroups, groupId}) {
    const [action, setAction] = new useState("none");
    return (
        <div className="bg-neutral-100 p-3 rounded-2xl">
            {action === "edit" ? <ChangeTaskMenu allGroups={allGroups} taskData={task} taskGroup={groupId} setAction={setAction}/> : null}
            {action === "delete" ? <DeleteConfirmationMenu setAction={setAction} /> : null}
            <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Task name:</p>
            <p className="text-xs font-mono font-bold text-gray-800/80">{task.id}</p>
            <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Timing</p>
            <p className="text-xs font-mono font-bold text-gray-800/80">everyday at {task.schedule.time}</p>
            <nav className="grid grid-cols-2 gap-2 mt-2 w-full">
                <div onClick={() => setAction(`edit`)} className="cursor-pointer flex items-center gap-1 justify-center text-emerald-600 bg-green-100 rounded-lg p-1">
                    <EditIcon className="text-xl text-emerald-600"/>
                    <p className="text-xs font-mono font-bold">Edit</p>
                </div>
                <div onClick={() => setAction(`delete`)} className="cursor-pointer flex items-center gap-1 justify-center text-red-500 bg-red-100 rounded-lg p-1">
                    <DeleteIcon className="text-xl text-red-500"/>
                    <p className="text-xs font-mono font-bold">Delete</p>
                </div>
            </nav>
        </div>
    )
}

function ChangeTaskMenu({allGroups, taskData, taskGroup, setAction}) {
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
        setAction("success");
    }
    let groups = [];
    for (const group in allGroups)
        groups.push(<SelectItem value={group} key={group} text={group}/>)
    let commands = [];
    for (const command of taskData.commands)
        commands.push(<InputTypeBox name="command" key={`cmd-${command}`} id={`cmd-${command}`} defaultText={command} placeholder="command"/>)
    return (
        <main className="z-10 absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-white/10 backdrop-blur">
            <div className={"lg:w-1/5 md:w-1/3 w-full mx-4 rounded-2xl flex flex-col justify-between items-center py-5 bg-white shadow-2xl"}>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-neutral-900 text-2xl">Edit {taskData.id}</h1>
                </div>
                <div className="px-5 mt-5 gap-2 flex flex-col w-full">
                    <p className="text-sm">Edit this task</p>
                    <SelectTypeBox id="group" defaultValue={taskGroup} title="New group">
                        {groups}
                        <SelectItem value="new_group" key="new_group" text={"New Group"}/>
                    </SelectTypeBox>
                    <InputTypeBox id="name" title="Task name" defaultText={taskData.id} placeholder="Name"/>
                    <p>Schedule</p>
                    <div className="flex gap-2">
                        <SelectTypeBox id="when_run" defaultValue={taskGroup} title="New group">
                            <SelectItem value="everyday" key="everyday" text={"everyday"}/>
                        </SelectTypeBox>
                        <InputTypeBox id="when_time" title="Hour" defaultText={taskData.schedule.time} placeholder="00:00"/>
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

function DeleteConfirmationMenu({setAction, taskId, taskGroup}) {
    const router = useRouter();
    return (
        <DraggableDialogBox onClose={() => setAction("none")}>
            <div className="flex flex-col items-center justify-center">
                <DeleteIcon className="text-7xl text-green-400"/>
                <h1 className="font-bold text-neutral-900 text-2xl">Delete {taskId}?</h1>
            </div>
            <p className="px-4 text-center text-neutral-600 pt-2">Confirm deletion of this task. This action is permanent and cannot be reversed.</p>
            <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
                <GrayButton onClick={() => setAction("none")} title="Close"/>
                <BlackButton onClick={() => {
                    fetcher(`/api/v1/tasks/delete?group=${taskGroup}&task=${taskId}`).then(r => router.refresh())
                }} title="Delete"/>
            </div>
        </DraggableDialogBox>
    )
}
