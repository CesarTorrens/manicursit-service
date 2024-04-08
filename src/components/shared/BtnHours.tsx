"use client";
import { useQuoteStore } from "app/store/quote";

export default function BtnHours({ time }: { time: string }) {
  let currentHourOnQuoteDate;
  const timeHour = time;
  const date = new Date();
  const [hours, minutes] = timeHour.split(":");
  date.setHours(Number(hours), Number(minutes));
  date.setSeconds(0);

  const quote = useQuoteStore((state) => state.quote);
  const setQuote = useQuoteStore((state) => state.setQuote);

  const handleDateQuote = () => {
    setQuote({ ...quote, date: date });
  };
  if (quote.date) {
    currentHourOnQuoteDate = new Date(quote.date).toLocaleTimeString(
      ["en-GB"],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }
  return (
    <button
      onClick={handleDateQuote}
      className={
        currentHourOnQuoteDate === timeHour
          ? "bg-btnSelected text-fontColor font-semibold min-w-[48%] py-2 rounded-md"
          : "bg-colorBtnTurn text-fontColor font-semibold min-w-[48%] py-2 rounded-md"
      }
    >
      {time}
    </button>
  );
}
