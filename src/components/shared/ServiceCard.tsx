import { Service } from "../../types/Service";
import { useQuoteStore } from "../../store/quote";

export default function ServiceCard({ service }: { service: Service }) {
  const setQuote = useQuoteStore((state) => state.setQuote);
  const quote = useQuoteStore((state) => state.quote);
  const selectService = (service: Service) => {
    setQuote({ ...quote, service });
  };

  return (
    <div
      onClick={() => selectService(service)}
      className="border border-colorBorder rounded-sm w-full mt-2 p-4 flex flex-col gap-2"
    >
      <p className="text-textColor font-medium">{service.name}</p>
      <p className="text-textColor font-medium">{service.description}</p>
      <div className="w-full text-end">
        <button
          type="button"
          className={
            quote.service?.id !== service.id
              ? "text-white bg-slate-400 font-medium rounded-md text-sm px-5 py-2.5"
              : "bg-slate-600 text-white  font-medium rounded-md text-sm px-5 py-2.5"
          }
        >
          {quote.service?.id !== service.id ? `Seleccionar` : "Seleccionado"}
        </button>
      </div>
    </div>
  );
}
