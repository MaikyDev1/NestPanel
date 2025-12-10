'use client'

import useSWR from "swr";
import {ErrorBox, LoadingContent, SceneBoxUI} from "@/app/components/BaseUI";

export default function Home() {
    // get from backend
    return (
      <main className="bg-neutral-700 flex justify-center h-screen w-screen">
        <section className="h-full md:w-1/3 w-full rounded-2xl bg-white">
          {/* Scenes */}
          <div className="flex justify-center w-full p-2">
            <div className="grid md:grid-cols-5 grid-cols-4 gap-3">
              <Scenes/>
            </div>
          </div>
        </section>
      </main>
    );
}

const fetcher = url => {
  console.log("Fetcher is running!");
  fetch(url).then(r => r.json())
}

function Scenes() {
  const {data, error, isLoading} = useSWR("/api/v1/scenes/get", fetcher)
  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (isLoading) return <LoadingContent/>;
  if (data.error !== undefined)
    return <ErrorBox>{data.error}</ErrorBox>
  let html = [];
  data.forEach(part => {
    html.push(
      <SceneBoxUI title={part.name} sceneId={part.id}/>
    )
  })
  return html;
}