import { create } from "zustand";

// Размер страницы задан на клиенте: API отдаёт `limit`, но в ответе он равен
// нулю («без лимита»), поэтому смещение считается по этому значению.
export const pageSize = 30;

interface PaginationState {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

// Номер страницы это клиентское состояние: по нему собирается ключ запроса, и
// его смена сама вызывает загрузку следующей страницы.
const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) })),
}));

export const useCurrentPage = () => usePaginationStore((state) => state.currentPage);
export const useSkip = () => (useCurrentPage() - 1) * pageSize;
export const useNextPage = () => usePaginationStore((state) => state.nextPage);
export const usePrevPage = () => usePaginationStore((state) => state.prevPage);

export default usePaginationStore;
