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
      case "temp_and_humidity":
        return <TempHumidityBox deviceID={data.id} color={data.meta.color === undefined ? "#202020" : data.meta.color}
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
    <div className="w-full h-[120px] flex flex-col rounded-2xl p-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-blue-500 to-blue-600">
      <div style={{color: `${color}`}} className="flex h-full justify-center items-center text-2xl text">
        <p className="font-bold text-white/90 font-mono">{data[getState.read_parameter]}</p>
        <span className="relative -translate-y-2 text-sm text-white/90 font-extrabold">o</span>
        <p className="font-bold font-mono text-white/90">C</p>
      </div>
      <div className="text-md text-center font-mono text-white/90">
        {title}
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
    <div className="w-full h-[120px] flex flex-col rounded-2xl p-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-300 via-cyan-400 to-cyan-500">
      <div style={{color: `${color}`}} className="flex h-full justify-center items-center text-2xl text">
        <p className="font-bold text-white/90 font-mono">{data[getState.read_parameter]}</p>
        <span className="text-2xl text-white/90 font-bold">%</span>
      </div>
      <div className="text-md text-center font-mono text-white/90">
        {title}
      </div>
    </div>
  )
}

export function TempHumidityBox({deviceID, title, color, getState}) {
  const {data, error, isLoading} = useSWR(`/api/v1/devices/run?device=${getState.device}&action=${getState.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (data === undefined) return <ErrorBox></ErrorBox>;

  return (
    <div className="w-full h-[120px] flex flex-col rounded-2xl p-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-300 via-cyan-400 to-cyan-500">
      <div style={{color: `${color}`}} className="flex h-full justify-center items-center text-2xl text">
        <p className="font-bold text-white/90 font-mono">{data[getState.read_parameter]}</p>
        <span className="text-2xl text-white/90 font-bold">%</span>
      </div>
      <div className="text-md text-center font-mono text-white/90">
        {title}
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
