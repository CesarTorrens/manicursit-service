import { create } from 'zustand';
import { Quote } from './types';

interface State {
  quote: Quote;
  setQuote: (quote: Quote) => void;
  cleanQuote: () => void;
}

export const useQuoteStore = create<State>((set) => ({
  quote: {
    service: null,
    clientName: null,
    date: null,
  },
  setQuote: (quote: Quote) => set({ quote }),
  cleanQuote: () =>
    set({ quote: { service: null, clientName: null, date: null } }),
}));
