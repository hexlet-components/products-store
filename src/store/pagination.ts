import { create } from "zustand";

interface PaginationState {
  skip: number;
  nextPage: (limit: number) => void;
  prevPage: (limit: number) => void;
}

// Смещение страницы это клиентское состояние: по нему собирается ключ запроса,
// и его смена сама вызывает загрузку следующей страницы.
const usePaginationStore = create<PaginationState>((set) => ({
  skip: 0,
  nextPage: (limit) => set((state) => ({ skip: state.skip + limit })),
  prevPage: (limit) => set((state) => ({ skip: state.skip - limit })),
}));

export const useSkip = () => usePaginationStore((state) => state.skip);
export const useNextPage = () => usePaginationStore((state) => state.nextPage);
export const usePrevPage = () => usePaginationStore((state) => state.prevPage);

export default usePaginationStore;
