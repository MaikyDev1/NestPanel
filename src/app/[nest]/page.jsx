'use client'

import useSWR from "swr";
import React from "react";
import {ErrorBox, LoadingBox, LoadingContent} from "@/app/components/BaseUI";
import {AnimatedLoadingIcon, BackIcon, TemperatureIcon} from "@/app/components/BaseIcons";
import BasicNest from "@/app/[nest]/nests/BasicNest";
import HeatingNest from "@/app/[nest]/nests/HeatingNest";
import {BackArrow, VerticalDots} from "@/app/FlareUI/FlareIcons";
import Link from "next/dist/client/link";

const fetcher = url => fetch(url).then(r => r.json())

export default function Page({params}) {
  const { nest } = React.use(params);
  const {data, error, isLoading} = useSWR(`/api/v1/nests/get?nest=${nest}`, fetcher)
  return (
    <section className="select-none h-full md:w-1/4 w-full bg-white flex flex-col">
      <Header nestName={data ? data.meta.title : "Loading"}/>
      {data === undefined || error || data.error ? <ErrorBox>{JSON.stringify(error)}</ErrorBox> : null}
      {!isLoading ? <WrapToNest data={data}/> : null}
    </section>
  )
}

function Header({nestName}) {
  return (
  <div className="p-6">
    <div className="flex justify-between items-center gap-4">
      <Link href="/" className="rounded-full p-2 aspect-square bg-stone-200">
        <BackArrow className="text-3xl"/>
      </Link>
      <p className="font-semibold text-xl text-stone-900">{nestName}</p>
      <div className="rounded-full p-2 aspect-square bg-stone-200">
        <VerticalDots className="text-3xl"/>
      </div>
    </div>
  </div>
  )
}

function WrapToNest({data}) {
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
    <div className="bg-white rounded-t-2xl flex flex-col flex-grow">
      <div className="flex justify-center w-full p-2">
        <p>No nest by this type {type}</p>
      </div>
    </div>
  )
}