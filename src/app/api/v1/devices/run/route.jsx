'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const device = searchParams.get('device');
  const action = searchParams.get('action');
  if (device === null || device === undefined || device === "all") {
    return NextResponse.json({error: "No device was mentioned!"});
  }
  if (action === null || action === undefined || action === "all") {
    return NextResponse.json({error: "Can not run this action!"});
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/device/${device}/run/${action}`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}