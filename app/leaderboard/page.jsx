import Ranking from "@/components/leaderboard/ranking";

const headers = {
  accept: "application/json",
  "X-API-Key": "JqyRWvwS7524cG1WE7P4xfzS2hUnfcrD",
};

async function getLeaderBoard(cant, desde) {
  const options = {
    method: "GET",
    cache: "no-store",
    headers,
  };
  const resp = await fetch(
    `https://api-gateway.skymavis.com/origins/v2/leaderboards?limit=${cant}&offset=${desde}`,
    options
  );
  const leader = await resp.json();
  return leader._items.map((el) => {
    return { userID: el.userID, name: el.name, topRank: el.topRank };
  });
}

export default async function Leaderboard() {
  const leaderboard = await getLeaderBoard(10, 0);

  return (
    <div>
      <h1>Leaderboard</h1>
      <Ranking leaderboard={leaderboard} />
    </div>
  );
}
