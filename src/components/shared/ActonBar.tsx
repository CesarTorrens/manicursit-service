"use client";
import { useState } from "react";
import { useStepsStore } from "app/store/steps";
import { useRouter, useParams } from "next/navigation";
import { useQuoteStore } from "app/store/quote";

export default function ActionBar() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{
    message: string | null;
    error: boolean;
  }>({
    message: null,
    error: false,
  });

  const quote = useQuoteStore((state) => state.quote);
  const cleanQuote = useQuoteStore((state) => state.cleanQuote);
  const step = useStepsStore((state) => state.steps);
  const incrementStep = useStepsStore((state) => state.increment);

  const saveQuote = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: quote.service?.id,
          clientName: quote.clientName,
          date: quote.date,
        }),
      });
      cleanQuote();
      setMessage({
        message: "Turno asignado correctamente",
        error: false,
      });
    } catch (error) {
      setMessage({
        message: "Error al asignar el turno",
        error: true,
      });
    }
  };

  const availableTurn =
    new Date().toLocaleTimeString(["en-GB"], {
      hour: "2-digit",
      minute: "2-digit",
    }) >= "17:00";
  const router = useRouter();
  const params = useParams();
  const { stepRoute } = params;

  const handleIncrementStep = async () => {
    if (stepRoute === "step3") {
      await saveQuote();
      setShowModal(true);
      incrementStep(-2);

      router.push("/");
      setTimeout(() => {
        setMessage({ message: null, error: false });
        setShowModal(false);
      }, 3000);
      return;
    }
    router.push(`/step${step + 1}`);
    incrementStep(1);
  };

  const handleBack = () => {
    if (step - 1 === 1) {
      router.push("/");
      incrementStep(-1);
      return;
    }
    router.push(`/step${step - 1}`);
    incrementStep(-1);
  };

  return (
    <section
      style={{ maxWidth: "530px" }}
      className="bg-white fixed z-10 bottom-[87px] w-full px-5 py-4 text-lg  border-t-2 border-slate-200 flex justify-between items-center"
    >
      <button
        disabled={step === 1}
        onClick={handleBack}
        style={{ opacity: step >= 2 ? "1" : "0" }}
        type="button"
        className="text-white bg-slate-600 font-medium rounded-md text-sm px-5 py-2.5 max-w-48"
      >
        Anterior
      </button>

      <button
        disabled={
          !quote.service ||
          (!!quote.service &&
            stepRoute === "step2" &&
            (!quote.date || !quote.clientName)) ||
          availableTurn
        }
        onClick={handleIncrementStep}
        type="button"
        className={
          (quote.service && !stepRoute && !availableTurn) ||
          (stepRoute && quote.date && quote.clientName && !availableTurn)
            ? "text-white bg-slate-600 font-medium rounded-md text-sm px-5 py-2.5 max-w-48"
            : "text-white bg-slate-400 font-medium rounded-md text-sm px-5 py-2.5 max-w-48"
        }
      >
        {stepRoute === "step3" ? "Confirmar" : "Siguiente"}
      </button>
      {showModal && message.message && (
        <div
          id="toast-success"
          className="flex bottom-[175px] right-[13%] fixed items-center w-full max-w-xs p-4 text-gray-500 bg-slate-200 rounded-lg shadow "
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            {message.error && (
              <>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              </>
            )}

            {!message.error && (
              <>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              </>
            )}
          </div>
          <div className="ms-3 text-sm font-normal">{message.message}</div>
        </div>
      )}
    </section>
  );
}
