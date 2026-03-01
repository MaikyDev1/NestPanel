import {Icon} from "@iconify/react";
import useSWR from "swr";
import {ErrorBox, LoadingBox} from "@/app/components/BaseUI";
import {StateDevice} from "@/app/[nest]/elements/BasicButtons";
import {GreenButton, RedButton, SimpleSwitch, SimpleVerticalSwitch} from "@/app/components/Buttons";
import React, {useEffect, useState} from "react";
import {FireIcon} from "@/app/fonts/IconsDB";

const fetcher = url => fetch(url).then(r => r.json())

export default function HeatingNest({nest}) {
  const {data, error, isLoading, mutate} = useSWR(`/api/v1/devices/run?device=${nest.get_time.device}&action=${nest.get_time.action}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingBox/>
  if (data === undefined) return <ErrorBox></ErrorBox>;
  const time = data[nest.get_time.read_parameter];
  return (
    <div className="bg-white rounded-t-2xl px-4 flex flex-col flex-grow">
      <div className="flex flex-col w-full">
        <div className="flex gap-2 flex-col">
          <WorkUntil time={time} nest={nest} mutate={() => mutate()}/>
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
    <div className={`aspect-square bg-zinc-200 rounded-[2rem] p-5 flex flex-col justify-between shadow-lg`}>
      <div className="flex items-center justify-between">
        <FireIcon className={`text-5xl bg-white p-2 text-stone-800 rounded-full`}/>
      </div>
      <div>
        <p className={`text-stone-800 font-semibold`}>Consumtion</p>
        <p className={`font-thin text-stone-800 text-xs`}>{Math.round(total_cost * 10) / 10}</p>
      </div>
    </div>
  )
}

const formatDuration = ms =>
  new Date(ms).toISOString().slice(11, 16);

function TwoHourClock({ initialDurationMs  }) {
  const TWO_HOURS = Math.max(2 * 60 * 60 * 1000, initialDurationMs);
  const ONE_MINUTE = 60 * 1000;

  const [elapsed, setElapsed] = useState(
    initialDurationMs
  );

  useEffect(() => {
    setElapsed(Math.min(initialDurationMs, TWO_HOURS));
  }, [initialDurationMs]);

  useEffect(() => {
    if (elapsed >= TWO_HOURS) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev - ONE_MINUTE;
        return next > TWO_HOURS ? TWO_HOURS : next;
      });
    }, ONE_MINUTE);

    return () => clearInterval(interval);
  }, [elapsed]);

  const progress = elapsed / TWO_HOURS;

  // Circle math
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Format HH:mm
  const totalMinutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  return (
    <div className="w-full aspect-square flex items-center justify-center relative p-3 rounded-3xl bg-stone-200">
      <svg className="absolute w-full h-full" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#ddd"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#ff637e"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 110 110)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="z-10 text-4xl font-semibold text-stone-800">
        {formatted}
      </div>
    </div>
  );
}

function WorkUntil({time, mutate, nest}) {
  return (
    <section>
      <TwoHourClock initialDurationMs={time}/>
      {time !== 0 ?
        <div className="grid grid-cols-2 mt-2 bg-stone-200 gap-2 p-1.5 col-span-2 rounded-xl">
          <div onClick={() => {fetcher(`/api/v1/devices/run?device=${nest.remove_time.device}&action=${nest.remove_time.action}&params={"time":30}`).then(r => mutate());}}
               className={`cursor-pointer rounded-lg p-3 text-center bg-white grow text-black`}>
            - 30 minute
          </div>
          <div onClick={() => {fetcher(`/api/v1/devices/run?device=${nest.add_time.device}&action=${nest.add_time.action}&params={"time":30}`).then(r => mutate());}}
               className={`cursor-pointer rounded-lg p-3 text-center bg-stone-800 grow text-white`}>
            + 30 minute
          </div>
        </div> : null
      }
    </section>
  )
}
