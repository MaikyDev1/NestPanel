'use client'

import useSWR from "swr";
import React from "react";
import {ErrorBox, LoadingContent} from "@/app/components/BaseUI";
import {AnimatedLoadingIcon, BackIcon, TemperatureIcon} from "@/app/components/BaseIcons";
import BasicNest from "@/app/components/nests/nest_types/BasicNest";
import HeatingNest from "@/app/components/nests/nest_types/HeatingNest";

const fetcher = url => fetch(url).then(r => r.json())

export default function Page({params}) {
  const { nest } = React.use(params);
  return (
    <section className="select-none h-full md:w-1/4 w-full bg-indigo-700 flex flex-col">
      <Header/>
      <WrapToNest nestId={nest}/>
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
  const {data, error, isLoading} = useSWR(`/api/v1/nests/get?nest=${nestId}`, fetcher)
  if (error) return <ErrorBox>{JSON.stringify(error)}</ErrorBox>;
  if (isLoading) return <LoadingNest/>;
  if (data === undefined) return <ErrorBox>Nest was not loaded</ErrorBox>;
  if (data.error !== undefined) return <ErrorBox>{data.error}</ErrorBox>;
  switch (data.meta.ui_type.toUpperCase()) {
    case "BASIC_NEST":
      return <BasicNest nest={data}/>
    case "THERMOSTAT_NEST":
      return <HeatingNest nest={data}/>
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
