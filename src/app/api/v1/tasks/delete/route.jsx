'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const group = searchParams.get('group');
  const task = searchParams.get('task');
  if (group === null || group === undefined || group === "all" ||
    task === null || task === undefined || task === "all") {
    return NextResponse.json({error: "No task and group"});
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/tasks/delete/${group}/${task}`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}