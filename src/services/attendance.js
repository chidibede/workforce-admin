import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

const markPresent = async (person) => {
  const { data: worker } = await supabase
    .from("attendance")
    .select("*")
    .eq("personid", person.id)
    .eq("program", "Awakening");

  if (worker.length > 0) return worker;
  const { error } = await supabase
    .from("attendance")
    .insert({ ispresent: true, personid: person.id, program: "Awakening" });

  if (error) {
    throw new Error(error.message);
  }

  return person;
};

const manualAttendance = async (person) => {
  const { data, error } = await supabase
    .from("person")
    .insert({ ...person })
    .select("*");
  const { error: attendanceError } = await supabase
    .from("attendance")
    .insert({ ispresent: true, personid: data[0].id, program: "Awakening" });

  if (error || attendanceError) {
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
