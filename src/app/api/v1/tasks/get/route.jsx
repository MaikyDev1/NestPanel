'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const scene = searchParams.get('scene');
  if (scene === null || scene === undefined || scene === "all") {
    const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/scene/all`);
    console.log(value)
    return NextResponse.json(value);
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/scene/${scene}`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}