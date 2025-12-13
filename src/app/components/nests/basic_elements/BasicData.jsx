import useSWR from "swr";
import {ErrorBox} from "@/app/components/BaseUI";
import {Icon} from "@iconify/react";
import {HumidityIcon, TemperatureIcon} from "@/app/components/BaseIcons";

const fetcher = url => fetch(url).then(r => r.json())

/**
 * This function will convert the data received from backend into valid JSX components
 * @param data
 */
export function WrapToData({data}) {
  switch (data.meta.data_type) {
    case "temperature":
      return <TemperatureBox deviceID={data.id} color={data.meta.color === undefined ? "#202020" : data.meta.color}
                             title={data.meta.title}  getState={data.value}/>
      case "humidity":
        return <HumidityBox deviceID={data.id} color={data.meta.color === undefined ? "#202020" : data.meta.color}
                               title={data.meta.title}  getState={data.value}/>
    default:
      return <NoBoxByType/>
  }
}

/**
 * Process and device action run
 * @param deviceID some id
 * @param title The title
 * @param color the accent color, not mandatory
 * @param getState must have {device, action, read_parameter}
 * @returns {JSX.Element}
 */
export function TemperatureBox({deviceID, title, color, getState}) {
  const {data, error, isLoading} = useSWR(`/api/v1/devices/run?device=${getState.device}&action=${getState.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (data === undefined) return <ErrorBox></ErrorBox>;

  return (
    <div className="w-full h-[100px] flex flex-col rounded-2xl p-5" style={{background: `${color}14`}}>
      <div className="flex items-center justify-between">
        <h1 className="text-md text-center font-mono" style={{color: `${color}`}}>{title}</h1>
      </div>
      <div style={{color: `${color}`}} className="flex h-full justify-center items-center text-2xl text">
        <p className="font-bold font-mono">{data[getState.read_parameter]}</p>
        <span className="relative -translate-y-2 text-sm font-extrabold">o</span>
      </div>
    </div>
  )
}

/**
 * Process and device action run
 * @param deviceID some id
 * @param title The title
 * @param color the accent color, not mandatory
 * @param getState must have {device, action, read_parameter}
 * @returns {JSX.Element}
 */
export function HumidityBox({deviceID, title, color, getState}) {
  const {data, error, isLoading} = useSWR(`/api/v1/devices/run?device=${getState.device}&action=${getState.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (data === undefined) return <ErrorBox></ErrorBox>;

  return (
    <div className="w-full h-[100px] flex flex-col rounded-2xl p-5" style={{background: `${color}14`}}>
      <div className="flex items-center justify-between">
        <h1 className="text-md text-center font-mono" style={{color: `${color}`}}>{title}</h1>
      </div>
      <div style={{color: `${color}`}} className="flex h-full justify-center items-center text-2xl text">
        <p className="font-bold font-mono">{data[getState.read_parameter]}</p>
        <HumidityIcon className="text-3xl"/>
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
