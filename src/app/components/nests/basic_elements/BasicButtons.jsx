import useSWR from "swr";
import {ErrorBox} from "@/app/components/BaseUI";
import {Icon} from "@iconify/react";
import {SimpleSwitch} from "@/app/components/Buttons";

const fetcher = url => fetch(url).then(r => r.json())

/**
 * This function will convert the data received from backend into valid JSX components
 * @param data
 */
export function WrapToButton({data}) {
  switch (data.meta.type) {
    case "state":
      return <StateDevice key={data.id} title={data.meta.title} color={data.meta.color} icon={data.meta.icon} deviceID={data.id}
                          getState={data.get_state} enableState={data.enable_actions} disableState={data.disable_actions}/>
  }
      return <NoBoxByType/>
}

export function StateDevice({deviceID, title, color, icon, getState, enableState, disableState}) {
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/devices/run?device=${getState.device}&action=${getState.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (data === undefined) return <ErrorBox></ErrorBox>;

  async function turn(param) {
    if (param.params !== undefined) {
      await fetcher(`/api/v1/devices/run?device=${param.device}&action=${param.action}&params=${encodeURIComponent(JSON.stringify(param.params))}`)
    } else {
      await fetcher(`/api/v1/devices/run?device=${param.device}&action=${param.action}`)
    }
    await mutate();
  }

  return (
    <div className="w-full h-[150px] flex flex-col justify-between rounded-2xl p-5" style={{background: `${color}30`}}>
      <div className="flex justify-between">
        <Icon icon={icon} className="text-5xl" style={{color: `${color}`}}/>
        <SimpleSwitch onChange={() => turn((data.state === 1 ? disableState : enableState))} defaultChecked={data.state === 1} id={deviceID} color={color}/>
      </div>
      <div className="">
        <h1 className="text-md font-mono" style={{color: `${color}`}}>{title}</h1>
        <p className="text-sm font-mono" style={{color: `${color}80`}}>{data.state === 1 ? "On" : "Off"}</p>
      </div>
    </div>
  )
}

export function NoBoxByType({type}) {
  return (
    <div className="w-full h-[150px] flex justify-center items-center rounded-2xl p-5 bg-red-400/40">
      <p className="text-red-500 font-mono text-xs">No item by this type {type}</p>
    </div>
  )
}