import TurnItem from "./TurnItem";
import { MyTurn } from "app/types/MyTurn";

const getMyTurns = async (): Promise<MyTurn[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/quotes`, {
    next: {
      revalidate: 60,
    },
  });
  const data: MyTurn[] = await res.json();
  return data;
};

export default async function Turns() {
  const turns = await getMyTurns();
  return (
    <main className="w-full overflow-auto flex flex-col pt-3 ">
      <h1 className="text-center text-3xl text-fontColor font-semibold mb-8">
        My Turns
      </h1>

      {turns.length ? (
        turns.map((turn) => (
          <TurnItem
            key={turn.id}
            service={turn.service}
            clientName={turn.clientName}
            date={new Date(turn.date)}
          />
        ))
      ) : (
        <h4 className="text-fontColor font-semibold px-1 mb-2">
          No hay turnos disponibles.
        </h4>
      )}
    </main>
  );
}
