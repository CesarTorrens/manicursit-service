"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import AvailableTurns from "app/components/Home/AvailableTurns";
import useQuotes from "app/hooks/useQuotes";
import { useQuoteStore } from "app/store/quote";
import { useRouter } from "next/navigation";

export default function Step2() {
  const { quotes, loading } = useQuotes();
  const [isValid, setIsValid] = useState(true);

  const router = useRouter();
  const quote = useQuoteStore((state) => state.quote);
  const setQuote = useQuoteStore((state) => state.setQuote);
  const { stepRoute } = useParams();

  if (stepRoute !== "step2" && stepRoute !== "step3") {
    router.push("/");
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[a-zA-Z\s]+$/;
    setIsValid(regex.test(value));
    setQuote({ ...quote, clientName: value });
  };

  if (stepRoute === "step2") {
    if (!quote.service) {
      return router.back();
    }
  }

  if (stepRoute === "step3") {
    if (!quote.clientName || !quote.date || !quote.service) {
      return router.back();
    }
    const date = new Date(quote.date);
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <section>
        <p className="text-textColor font-medium">
          Nombre del cliente: {quote.clientName}
        </p>
        <p className="text-textColor font-medium">
          Servicio: {quote.service?.name}
        </p>
        <p className="text-textColor font-medium">
          Fecha: {formattedDate} {formattedTime}
        </p>
      </section>
    );
  }

  return (
    <>
      {!loading && quotes.length && stepRoute === "step2" && (
        <section>
          <h3 className="text-fontColor font-semibold px-1 mb-2">
            Próximos turnos disponibles
          </h3>

          <AvailableTurns quotes={quotes} />

          <div className="mt-8">
            <input
              value={quote.clientName || ""}
              onChange={handleInputChange}
              type="text"
              id="first_name"
              className={`border ${
                isValid ? "border-gray-300" : "border-red-500"
              } text-gray-900 text-sm rounded-lg w-full p-2.5 `}
              placeholder="Nombre del cliente"
              required
            />
            {!isValid && (
              <p className="text-red-500">Por favor, ingresa solo letras.</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
