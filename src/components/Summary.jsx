import React from "react";
import Select from "./Dropdown";

const Summary = ({
  totalWorkers,
  presentWorkers,
  absentWorkers,
  confirmedPresent,
  confirmedAbsent,
  totalConfirmed,
  teams,
  onChange,
  team,
  title
}) => {
  const percentagePresent = totalWorkers
    ? ((presentWorkers / totalWorkers) * 100).toFixed(2)
    : 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div>
        <Select options={teams} onChange={onChange} className="mb-3" />
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-xl font-bold text-center mb-4 px-24">
            Worker Attendance Dashboard - {team === "All" ? "All Teams" : team}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold">Total {title}</h3>
              <p className="text-xl font-bold">{totalWorkers}</p>
            </div>
            <div className="p-4 bg-green-200 rounded-lg">
              <h3 className="text-lg font-semibold">Present {title}</h3>
              <p className="text-xl font-bold">{presentWorkers}</p>
            </div>
            <div className="p-4 bg-red-200 rounded-lg">
              <h3 className="text-lg font-semibold">Absent {title}</h3>
              <p className="text-xl font-bold">{absentWorkers}</p>
            </div>
            <div className="p-4 bg-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold">% Present</h3>
              <p className="text-xl font-bold">{percentagePresent}%</p>
            </div>
            {/* <div className="p-4 bg-purple-200 rounded-lg">
            <h3 className="text-lg font-semibold">Confirmed Present</h3>
            <p className="text-xl font-bold">{confirmedPresent}</p>
            </div>
          <div className="p-4 bg-orange-200 rounded-lg">
            <h3 className="text-lg font-semibold">Confirmed Absent</h3>
            <p className="text-xl font-bold">{confirmedAbsent}</p>
          </div> */}
            <div className="col-span-2 p-4 bg-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold">Total Confirmed {title}</h3>
              <p className="text-xl font-bold">{totalConfirmed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
