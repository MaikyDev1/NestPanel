import {Icon} from "@iconify/react";
import useSWR from "swr";
import {ErrorBox} from "@/app/components/BaseUI";
import {StateDevice} from "@/app/components/nests/basic_elements/BasicButtons";
import {GreenButton, RedButton, SimpleSwitch} from "@/app/components/Buttons";

const fetcher = url => fetch(url).then(r => r.json())

export default function HeatingNest({nest}) {
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/devices/run?device=${nest.get_time.device}&action=${nest.get_time.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (data === undefined) return <ErrorBox></ErrorBox>;
  const time = data[nest.get_time.read_parameter];
  return (
    <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
      <div className="flex flex-col w-full p-2">
        <h1 className="text-neutral-900 font-thin text-lg ml-2">Home heating</h1>
        <div className="flex gap-2 flex-col">
          <WorkUntil time={time}/>
          {time !== 0?
            <div className="h-[50px] grid grid-cols-2 gap-2">
              <RedButton onClick={() => {
                fetcher(`/api/v1/devices/run?device=${nest.remove_time.device}&action=${nest.remove_time.action}&params={"time":30}`)
                mutate();
              }} title="- 30 minutes"/>
              <GreenButton onClick={() => {
                fetcher(`/api/v1/devices/run?device=${nest.add_time.device}&action=${nest.add_time.action}&params={"time":30}`)
                mutate();
              }} title="+ 30 minutes"/>
            </div> : null
          }
          <div className="w-full grid grid-cols-2 gap-2">
            <StateDevice disableState={nest.turn_off} enableState={nest.turn_on} deviceID="id" title="Start Heating" icon="material-symbols:mode-heat"
                         getState={nest.get_time} color="#d96111"/>
            <Consumption time={time} consumptionSettings={nest.configuration.energy_consumption}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function Consumption({time, consumptionSettings}) {
  const now = new Date(Date.now());
  const heatingTime = new Date(Date.now() + time);
  const heatUntil = heatingTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const total_cost = consumptionSettings.per_hour/60 * (heatingTime - now) / (1000 * 60)
  return (
    <div className="w-full h-[150px] flex flex-col justify-end rounded-2xl p-5 bg-gradient-to-t from-red-500/40 to-orange-600/40">
      <p className="flex justify-center items-center text-4xl font-extrabold text-red-500/70 h-full w-full">
        {time === 0 ? 0 : consumptionSettings.per_hour} {consumptionSettings.measure_unit}
      </p>
      <div className="text-white font-extrabold uppercase flex justify-between">
        <p>{heatUntil}</p>
        <p>costs {Math.round(total_cost * 10) / 10}</p>
      </div>
    </div>
  )
}

function WorkUntil({time}) {
  const now = new Date(Date.now());
  const heatingTime = new Date(Date.now() + time);
  const heatUntil = heatingTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return (
    <div className="w-full h-[140px] items-center flex gap-4 flex-col p-3 rounded-3xl bg-orange-300">
      {time !== 0 ?
        <p className="uppercase font-bold text-orange-400">Heating until <span className="text-white/80">{heatUntil}</span></p> :
      <p className="uppercase font-bold text-orange-400">Heating stopped</p>}
      <div className="h-full flex items-end w-full bg-white/30 backdrop-blur-2xl rounded-l-full rounded-r-full">
        <div className="relative flex w-full h-full items-end justify-between mx-10 uppercase font-bold text-orange-50">
          <p className="z-10">{now.getHours() === heatingTime.getHours() ? `${heatingTime.getHours() - 1}:00` : "now"}</p>
          <p className="z-10">{now.getHours() !== heatingTime.getHours() ? `${heatingTime.getHours()}:00` : "now"}</p>
          {time !== 0 && <div className="text-yellow-200 right-0 absolute top-0 bottom-0 w-1/2 flex flex-col items-center justify-end" style={{
            background: 'linear-gradient(to right, transparent 0%, #fdba74 40%, #fdba74 60%, transparent 100%)',
          }}>
            <Icon icon="material-symbols:mode-heat" className="text-3xl"/>
            <Icon icon="ic:round-arrow-left" className="rotate-90 text-4xl"/>
          </div>}
          <p className="z-10">{heatingTime.getHours() + 1}:00</p>
        </div>
      </div>
    </div>
  )
}
