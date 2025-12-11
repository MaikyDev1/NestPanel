'use server'

import {NextResponse} from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const nest = searchParams.get('nest');
  const action = searchParams.get('action');
  if (nest === null || nest === undefined || nest === "all") {
    return NextResponse.json([
      {
        id: "balcony",
        icon: "cbi:roomsbalcony",
        color: "#7735b5",
        meta: {
          ui_type: "basic_nest",
          title: "Balcony",
          description: "Miaw miaw miaw"
        },
        devices_count: "3"
      },
      {
        id: "heating",
        icon: "cbi:wiser-heating-ctl-off",
        color: "#d96111",
        meta: {
          ui_type: "thermostat_nest",
          title: "Centrala",
          description: "Sa curga bani"
        }
      }
    ]);
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