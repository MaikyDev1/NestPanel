'use server'

import {NextResponse} from "next/server";
import {console} from "next/dist/compiled/@edge-runtime/primitives";

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
  const params = searchParams.get('params');
  let to_send = "?";
  if (params !== null) {
    const paramsObj = JSON.parse(decodeURIComponent(params)); // convert string to object
    for (const key in paramsObj) {
      to_send += `${key}=${paramsObj[key]}&`;
    }
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/device/${device}/run/${action}${to_send}`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}