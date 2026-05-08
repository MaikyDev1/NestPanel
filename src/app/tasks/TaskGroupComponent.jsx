import React, {useState} from "react";
import {EditPenIcon, DeleteIcon, MoreActionsDots, CogIcon} from "@/app/FlareUI/FlareIcons";
import {InputTypeBox, SelectAndInput, SelectItem, SelectTypeBox} from "@/app/components/BaseUI";
import {BlackButton, GrayButton} from "@/app/FlareUI/Basic/Buttons";
import {DraggableDialogBox} from "@/app/FlareUI/Mobile/DialogBoxes";
import {PlusIcon} from "../components/BaseIcons";

export function Tasks({data, mutate}) {
    let content = [];
    const allGroups = Object.keys(data)
    for (const groupId in data) {
        content.push(<TaskGroup key={groupId} groupId={groupId} mutate={mutate} allGroups={allGroups} tasks={data[groupId]}/>);
    }
    return (
        <div className="bg-white rounded-t-2xl flex flex-col mt-2 flex-grow">
            <div className="flex flex-col w-full gap-1">
                {content}
            </div>
        </div>
    )
}

function TaskGroup({allGroups, groupId, tasks, mutate}) {
    const [action, setAction] = useState("none");
    if (action === "success") {
        mutate();
        setAction("none")
    }
    let content = [];
    for (const task of tasks) {
        content.push(<TaskInterface mutate={mutate} key={task.id} groupId={groupId} task={task} allGroups={allGroups}/>);
    }
    return (
        <div className="bg-stone-200 rounded-xl px-2 p-1">
            <div className="text-neutral-900 mb-1 font-thin flex items-center justify-between text-md">
                {action === "delete" ? <DeleteGroupConfirmationMenu group={groupId} allTasksOfGroup={tasks} setAction={setAction}/> : null }
                <p>{groupId}'s tasks</p>
                <div className="px-2 bg-stone-300 aspect-square relative flex justify-center items-center rounded-xl">
                    <DeleteIcon onClick={() => setAction("delete")} className="text-lg text-stone-800"/>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {content}
            </div>
        </div>
    )
}

function TaskInterface({task, allGroups, groupId, mutate}) {
    const [action, setAction] = new useState("none");
    if (action === "success") {
        mutate(); setAction("none");
    }
    return (
        <div className="bg-neutral-100 p-3 justify-between items-center flex rounded-2xl">
            {action === "edit" ? <ChangeTaskMenu allGroups={allGroups} taskData={task} taskGroup={groupId} setAction={setAction}/> : null}
            {action === "delete" ? <DeleteTaskConfirmationMenu setAction={setAction} taskGroup={groupId} taskId={task.id}/> : null}
            <div className="flex flex-col gap-1">
                <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Task name:</p>
                <p className="text-xs font-mono font-bold text-gray-800/80">{task.id}</p>
                <p className="text-xs font-mono font-bold text-gray-800/50 uppercase">Timing</p>
                <p className="text-xs font-mono font-bold text-gray-800/80">everyday at {task.schedule.time}</p>
            </div>
            <nav className="flex gap-2 mt-2">
                <div onClick={() => setAction("edit")} className="cursor-pointer gap-1 justify-center items-center flex-col flex">
                    <div className="p-3 bg-stone-800 flex justify-center items-center rounded-lg drop-shadow aspect-square">
                        <EditPenIcon className="text-md text-white"/>
                    </div>
                    <p>Edit</p>
                </div>
                <div onClick={() => setAction("delete")} className="cursor-pointer gap-1 justify-center items-center flex-col flex">
                    <div className="p-3 bg-stone-800 flex justify-center items-center rounded-lg drop-shadow aspect-square">
                        <DeleteIcon className="text-md text-white"/>
                    </div>
                    <p>Edit</p>
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
            from_id: taskData.id,
            from_group: taskGroup,
            id: document.getElementById("name").value,
            group: document.getElementById("group").value,
            schedule: {
                time: document.getElementById("when_time").value,
            },
            commands: formData.getAll("command"),
        }
        const res = await fetch("api/v1/tasks/change", {
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
                    <h1 className="font-bold text-neutral-900 text-2xl">Edit {taskData.id}</h1>
                </div>
                <div className="mt-5 gap-2 flex flex-col w-full">
                    <p className="text-stone-500 font-semibold">Basic Information</p>
                    <div className="bg-stone-200 px-3 py-2 rounded-lg">
                        <SelectAndInput options={allGroups} defaultSelection={taskGroup} placeholder="group" title="Task group" id="group"/>
                        <InputTypeBox id="name" title="Task name" defaultText={taskData.id} placeholder="Name"/>
                    </div>
                    <p className="text-stone-500 font-semibold">Schedule</p>
                    <div className="bg-stone-200 px-3 py-2 rounded-lg">
                        <div className="flex gap-2">
                            <SelectTypeBox id="when_run" defaultValue={taskGroup} title="New group">
                                <SelectItem value="everyday" key="everyday" text={"everyday"}/>
                            </SelectTypeBox>
                            <InputTypeBox id="when_time" title="Hour" defaultText={taskData.schedule.time} placeholder="00:00"/>
                        </div>
                    </div>
                    <p className="text-stone-500 font-semibold">Commands</p>
                    <div className="bg-stone-200 px-3 flex flex-col py-2 rounded-lg">
                        <EditCommandsList commandsList={taskData.commands}/>
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

export function EditCommandsList({commandsList}) {
    const [commands, setCommands] = useState(commandsList !== undefined ? commandsList : []);
    const handleDelete = (commandToDelete) => {
        setCommands(prev =>
            prev.filter(command => command !== commandToDelete)
        );
    };
    const handleAddNew = () => {
        setCommands(prev => [...prev, ""]);
    };
    return (
        <div className="flex flex-col">
            <GrayButton onClick={() => handleAddNew()} title="Add new"/>
            <div className="mt-2">
                {commands.map((command) => (
                    <div key={command} className="flex items-center justify-center gap-1">
                        <InputTypeBox
                            name="command"
                            id={`cmd-${command}`}
                            defaultText={command}
                            placeholder="command"
                        />
                        <div className="bg-stone-300 flex">
                            <DeleteIcon
                              className="text-2xl cursor-pointer"
                              onClick={() => handleDelete(command)}
                            />
                        </div>

                    </div>
                ))
                }
            </div>
        </div>
    )
}

function DeleteTaskConfirmationMenu({setAction, taskId, taskGroup}) {
    return (
        <DraggableDialogBox onClose={() => setAction("none")}>
            <div className="flex flex-col items-center justify-center">
                <DeleteIcon className="text-7xl"/>
                <h1 className="font-bold text-neutral-900 text-2xl">Delete {taskId}?</h1>
            </div>
            <p className="px-4 text-center text-neutral-600 pt-2">Confirm deletion of this task. This action is permanent and cannot be reversed.</p>
            <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
                <GrayButton onClick={() => setAction("none")} title="Close"/>
                <BlackButton onClick={() => {
                    fetch(`/api/v1/tasks/delete?group=${taskGroup}&task=${taskId}`).then(r => setAction("success"))
                }} title="Delete"/>
            </div>
        </DraggableDialogBox>
    )
}

function DeleteGroupConfirmationMenu({setAction, group, allTasksOfGroup}) {
    return (
      <DraggableDialogBox onClose={() => setAction("none")}>
          <div className="flex flex-col items-center justify-center">
              <DeleteIcon className="text-7xl"/>
              <h1 className="font-bold text-neutral-900 text-2xl">Delete group {group}</h1>
          </div>
          <p className="px-4 text-center text-neutral-600 pt-2">Confirm deletion of this group and all its {allTasksOfGroup.length} tasks. This action is permanent and cannot be reversed.</p>
          <div className="pt-6 grid grid-cols-2 w-2/3 gap-2">
              <GrayButton onClick={() => setAction("none")} title="Close"/>
              <BlackButton onClick={() => {
                  fetch(`/api/v1/tasks/delete?group=${group}`).then(r => setAction("success"))
              }} title="Delete"/>
          </div>
      </DraggableDialogBox>
    )
}
