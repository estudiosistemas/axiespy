import { NextResponse } from "next/server";

const headers = {
  accept: "application/json",
  "X-API-Key": "JqyRWvwS7524cG1WE7P4xfzS2hUnfcrD",
};

async function getBattles(id) {
  const options = {
    method: "GET",
    cache: "no-store",
    headers,
  };
  const url = `https://api-gateway.skymavis.com/x/origin/battle-history?type=pvp&client_id=${id}&limit=5`;

  const resp = await fetch(url, options);
  const jugador = await resp.json();
  console.log(url);
  return jugador.battles;
}

export async function POST(request) {
  const id = await request.json();
  const battles = await getBattles(id.id);
  return NextResponse.json(battles[0]);
}
