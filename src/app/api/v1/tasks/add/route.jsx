'use server'

import {NextResponse} from "next/server";

export async function GET(request) {

}

async function sendHttpRequest(part) {
  return await fetch(part).then(res => res.json()).catch((e) => console.log(e))
}