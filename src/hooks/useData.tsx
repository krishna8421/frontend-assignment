import { useEffect, useState } from "react";
import axios from "axios";
import { IApiResponse } from "@/types/api";

interface IUseData {
  data: IApiResponse | null;
  loading: boolean;
  error: string | null;
}

export const useData = (): IUseData => {
  const [data, setData] = useState<IApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IApiResponse>(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
