import { Service } from "app/types/Service";
export default function TurnItem(turn: {
  service: Service;
  clientName: string;
  date: Date;
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 w-full">
      <div className="w-4/5">
        <h3
          style={{ maxWidth: "calc(100% - 0px)" }}
          className="text-xl font-semibold truncate w-full"
        >
          {turn.service.name}
        </h3>
        <p className="text-sm text-gray-600">{turn.clientName}</p>
      </div>
      <div className="w-1/5">
        <p className="text-sm text-gray-600 text-end">
          {" "}
          {turn.date.toLocaleTimeString(["en-GB"], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
        </p>
      </div>
    </div>
  );
}
