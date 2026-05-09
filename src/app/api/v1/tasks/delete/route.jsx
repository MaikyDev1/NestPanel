'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const group = searchParams.get('group');
  const task = searchParams.get('task');
  const options = {method: 'POST'};
  let response = null;
  if (task === null && group !== null) {
    response = await fetch(`${process.env.NESTSERVER}/api/v1/tasks/delete/${group}`, options);
  } else if(task !== null && group !== null) {
    response = await fetch(`${process.env.NESTSERVER}/api/v1/tasks/delete/${group}/${task}`, options);
  }
  if (response === null)
    return NextResponse.json({error: "Bad request"})
  const data = await response.json();
  return NextResponse.json(data);
}