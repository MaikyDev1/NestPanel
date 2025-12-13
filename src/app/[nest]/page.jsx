'use client'

import {SimpleSwitch} from "@/app/components/Buttons";
import useSWR from "swr";
import {ErrorBox, LoadingContent} from "@/app/components/BaseUI";
import {AnimatedLoadingIcon, BackIcon, TemperatureIcon} from "@/app/components/BaseIcons";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {HumidityBox, NoBoxByType, TemperatureBox, WrapToBox} from "@/app/components/nests/basic_elements/BasicData";
import BasicPage from "@/app/components/nests/nest_types/BasicPage";

const fetcher = url => fetch(url).then(r => r.json())

export default function Page({params}) {
  return (
    <section className="select-none h-full md:w-1/4 w-full bg-indigo-700 flex flex-col">
      <Header/>
      <WrapToNest/>
    </section>
  )
}

function Header() {
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
      </div>
    </div>
  )
}

function WrapToNest({nestId}) {
  const {data, error, isLoading} = useSWR("/api/v1/nests/get?nest=asd", fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingNest/>;
  if (data === undefined) return <ErrorBox>Nest was not loaded</ErrorBox>;
  switch (data.meta.ui_type) {
    case "basic_nest":
      return <BasicPage nest={data}/>
    case "humidity":
      return <HumidityBox deviceID={data.id} color={data.meta.color === undefined ? "#202020" : data.meta.color}
                          title={data.meta.title}  getState={data.value}/>
    default:
      return <NoNestByType type={data.meta.ui_type}/>
  }
}

function NoNestByType({type}) {
  return (
    <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
      <div className="flex justify-center w-full p-2">
        <p>No nest by this type {type}</p>
      </div>
    </div>
  )
}

function LoadingNest() {
  return (
    <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
      <div className="flex justify-center w-full p-2">
        <AnimatedLoadingIcon className="text-5xl animate-pulse"/>
      </div>
    </div>
  )
}
