import { useCallback, useEffect, useState } from "react";

interface DataState<T> {
  data: T[];
  loading: boolean;
}

interface DataActions {
  fetchData: () => Promise<void>;
  refresh: () => Promise<void>;
}

type ApiFunction<T> = () => Promise<T[]>;

export const useGridData = <T>(
  apiFunction: ApiFunction<T>,
  autoFetch: boolean = true
): [DataState<T>, DataActions] => {
  const [state, setState] = useState<DataState<T>>({
    data: [],
    loading: false,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await apiFunction();
      setState({ data: response, loading: false });
    } catch (err: any) {
      setState((prev) => ({ ...prev, loading: false }));
      alert(err.message);
    }
  }, [apiFunction]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return [state, { fetchData, refresh }];
};
