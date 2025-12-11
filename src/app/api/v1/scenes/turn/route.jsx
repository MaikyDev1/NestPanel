'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const scene = searchParams.get('scene');
  const newState = searchParams.get('newState');
  if (scene === null || scene === undefined || scene === "all") {
    return NextResponse.json({error: "Scene not found!"});
  }
  const value = await sendHttpRequest(`${process.env.NESTSERVER}/api/v1/scene/${scene}/run`);
  return NextResponse.json(value);
}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}