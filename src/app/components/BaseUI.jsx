export function SceneBoxUI({title, description, icon, sceneId}) {
  return (
    <div id={sceneId} className="flex rounded-2xl items-center justify-center h-20 w-20 bg-amber-300">
      {title} | {sceneId}
    </div>
  )
}

export function LoadingContent() {
  return (
    <main className="h-full w-full bg-white/10">
      Loading...
    </main>
  )
}

export function ErrorBox({children}) {
  return (
    <main className="h-full w-full bg-white/10">
      asdads
      {children}
    </main>
  )
}