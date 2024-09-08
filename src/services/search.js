import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";

const searchWorkers = async (searchParams) => {
  console.log({ searchParamsssssss: JSON.stringify(searchParams) });

  // Mock delay for demonstration purposes
  const { data, error } = await supabase.from("person").select("*");
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Worker not found");
  }
  return data;
};

export const useSearchWorker = (searchParams) => {
  console.log({ searchParams: JSON.stringify(searchParams) });
  return useQuery({
    queryKey: [searchParams],
    queryFn: () => searchWorkers(searchParams),
  });
};
