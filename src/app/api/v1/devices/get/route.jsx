'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const device = searchParams.get('device');
  if (device === null || device === undefined || device === "all") {
    const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/device/all`);
    return NextResponse.json(value);
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/device/${device}`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}