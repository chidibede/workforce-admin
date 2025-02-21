import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import supabase from "../services/supabase";

function DashboardPage() {
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [presentWorkers, setPresentWorkers] = useState(0);
  const [absentWorkers, setAbsentWorkers] = useState(0);
  const [confirmedPresent, setConfirmedPresent] = useState(0);
  const [confirmedAbsent, setConfirmedAbsent] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { count: total } = await supabase
        .from("leader")
        .select("*", { count: "exact", head: true });
      setTotalWorkers(total || 0);

      const { count: present } = await supabase
        .from("leader")
        .select("*", { count: "exact", head: true })
        .eq("ispresent", true);
      setPresentWorkers(present || 0);
      setAbsentWorkers((total || 0) - (present || 0));

      const { count: confirmed } = await supabase
        .from("leader")
        .select("*", { count: "exact", head: true })
        .eq("isconfirmed", true);
      setTotalConfirmed(confirmed || 0);

      const { count: confirmedPres } = await supabase
        .from("leader")
        .select("*", { count: "exact", head: true })
        .eq("isconfirmed", true)
        .eq("ispresent", true);
      setConfirmedPresent(confirmedPres || 0);

      setConfirmedAbsent((confirmed || 0) - (confirmedPres || 0));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Summary
        absentWorkers={absentWorkers}
        confirmedAbsent={confirmedAbsent}
        confirmedPresent={confirmedPresent}
        totalWorkers={totalWorkers}
        presentWorkers={presentWorkers}
        totalConfirmed={totalConfirmed}
      />
    </div>
  );
}

export default DashboardPage;
