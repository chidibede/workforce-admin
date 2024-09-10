import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";
import { getAwakeningDay } from "../utils/getAwakeningDay";
import { awakeningMap } from "../utils/awakeningMap";

const markPresent = async (person) => {
  const day = getAwakeningDay();
  const isPresentKey = awakeningMap[day] || "ispresentawakeningone";
  const { data: worker } = await supabase
    .from("person")
    .select("*")
    .eq("id", person.id);

  const workerAttendance = worker[0][isPresentKey];

  if (workerAttendance) return worker[0];

  const dateUTC = new Date();
  const dateISO = dateUTC.toISOString();

  const { data, error } = await supabase
    .from("person")
    .update({ [isPresentKey]: true, updatedat: dateISO })
    .eq("id", person.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const manualAttendance = async (person) => {
  const { data, error } = await supabase
    .from("person")
    .insert({ ...person })
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useAttendance = () => {
  return useMutation({
    mutationFn: markPresent,
    cacheTime: 0,
  });
};

export const useManualAttendance = () => {
  return useMutation({
    mutationFn: manualAttendance,
    cacheTime: 0,
  });
};
