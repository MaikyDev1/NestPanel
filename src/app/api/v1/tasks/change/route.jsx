'use server'

import {NextResponse} from "next/server";

export async function POST(request) {
  const body = await request.json();
  const payload = {
    from_id: body.from_id,
    from_group: body.from_group,
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
  fetch(`${process.env.NESTSERVER}/api/v1/tasks/change`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
}