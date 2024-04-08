import { useState, useEffect } from "react";
import { QuoteRequest } from "app/types/Quote";

const useQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuotes = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/quotes`);
      const data: QuoteRequest[] = await res.json();
      setQuotes(data);
      setLoading(false);
    };

    getQuotes();
  }, []);

  return { quotes, loading };
};

export default useQuotes;
