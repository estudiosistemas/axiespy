"use client";
import { useEffect, useState } from "react";
import Players from "@/components/leaderboard/players";

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const count = Math.floor(seconds / 60);
  // return `Hace ${count} minutos`;
  return count;
}

export default function Ranking({ leaderboard }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    let newLeaderboard = [];
    async function getData() {
      for (let player of leaderboard) {
        const id = player.userID;
        const res = await fetch(`/api/read-battles`, {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const place = data.client_ids.indexOf(id);
        const axies =
          place === 0
            ? {
                axie1: data.first_client_fighters[0].axie_id,
                axie2: data.first_client_fighters[1].axie_id,
                axie3: data.first_client_fighters[2].axie_id,
              }
            : {
                axie1: data.second_client_fighters[0].axie_id,
                axie2: data.second_client_fighters[1].axie_id,
                axie3: data.second_client_fighters[2].axie_id,
              };
        console.log(place);
        newLeaderboard.push({
          ...player,
          lastBattle: timeSince(new Date(data.ended_time * 1000)),
          axie1: axies.axie1,
          axie2: axies.axie2,
          axie3: axies.axie3,
        });
      }
      setJugadores(newLeaderboard);
    }

    getData();
  }, [leaderboard]);

  return (
    <>
      <ul className="pt-5">
        {jugadores.length > 0 ? (
          <Players data={jugadores} />
        ) : (
          <p>Loading top 100...</p>
        )}
      </ul>
    </>
  );
}
