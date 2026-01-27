'use server'

import {NextResponse} from "next/server";

export async function POST(request) {
  const body = await request.json();
  const payload = {
    id: body.id,
    group: body.group,
    schedule: {
      time: body.schedule.time,
    },
    commands: body.commands
  };
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  };
  fetch(`${process.env.NESTSERVER}/api/v1/tasks/new`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}