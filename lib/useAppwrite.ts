import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface UseAppwriteReturn {
  data: any[];
  isLoading: boolean;
  refetch: () => void;
}

const useAppwrite = (fn: () => Promise<any[]>): UseAppwriteReturn => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
