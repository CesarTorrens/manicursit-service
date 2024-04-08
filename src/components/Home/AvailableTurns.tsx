import { QuoteRequest } from "app/types/Quote";
import BtnHours from "../shared/BtnHours";

const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export default function AvailableTurns({ quotes }: { quotes: QuoteRequest[] }) {
  const date = new Date();
  let formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
  let [day, month] = formattedDate.split(" de ");
  month = month.charAt(0).toUpperCase() + month.slice(1);
  formattedDate = `${day} de ${month}`;

  const availableTimes = times.filter((time) => {
    return !quotes.some((quote) => {
      return (
        new Date(quote.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) === time
      );
    });
  });
  const currentHour = date.toLocaleTimeString(["en-GB"], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newTimes = availableTimes.filter((time) => time > currentHour);

  const timeAfternoon = newTimes.filter((time) => {
    return time > "12:00";
  });

  const timeMorning = newTimes.filter((time) => {
    return time <= "12:00";
  });

  return (
    <>
      {timeAfternoon.length === 0 && timeMorning.length === 0 ? (
        <h4 className="text-fontColor font-semibold px-1 mb-2">
          No hay turnos disponibles
        </h4>
      ) : (
        <>
          {timeMorning.length > 0 && (
            <div>
              <h4 className="text-fontColor font-semibold px-1 mb-2">
                {formattedDate}
              </h4>
              <div className="flex flex-wrap gap-3 justify-between">
                {timeMorning.map((time, index) => {
                  return <BtnHours key={time} time={time} />;
                })}
              </div>
            </div>
          )}
          <div>
            <h4 className="text-fontColor font-semibold px-1 mb-2">
              {formattedDate}
            </h4>
            <div className="flex flex-wrap gap-3 justify-between">
              {timeAfternoon.map((time, index) => {
                return <BtnHours key={time} time={time} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
