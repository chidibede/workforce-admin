import { useSearchWorker } from "./services/search";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch";
import { useState } from "react";
import { useAttendance, useManualAttendance } from "./services/attendance";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { useQueryClient } from "@tanstack/react-query";

const Attendance = () => {
  const { debouncedSearch, search: searchValue } = useDebouncedSearch();
  const { data: filteredPeople, isLoading } = useSearchWorker(searchValue);
  const { mutate: markAttendanceMutation } = useAttendance();
  const { mutate: manualAttendanceMutation } = useManualAttendance();
  const [query, setQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [mutateIsLoadingId, setMutateIsLoadingId] = useState(0);
  const [manuallySaving, setManuallySaving] = useState(false);
  const queryClient = useQueryClient();
  const [newPerson, setNewPerson] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    department: "",
    team: "",
    fullname: "",
  });

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedSearch(
      e.target.value.startsWith(0)
        ? e.target.value.replace(0, "")
        : e.target.value
    );
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const resetCreate = () => {
    setIsCreating(false);
  };

  const handleSave = () => {
    setManuallySaving(true)
    manualAttendanceMutation({...newPerson, fullname: `${newPerson.firstname} ${newPerson.lastname}`}, {
      onSuccess() {
        queryClient.invalidateQueries();
        debouncedSearch(newPerson.fullname)
        setNewPerson({
          firstname: "",
          lastname: "",
          phonenumber: "",
          department: "",
          team: "",
          fullname: "",
        });
        setManuallySaving(false)
        setIsCreating(false);
      },
      onError(error) {
        setNewPerson({
          firstname: "",
          lastname: "",
          phonenumber: "",
          department: "",
          team: "",
          fullname: "",
        });
        setManuallySaving(false)
        setIsCreating(false);
        throw error;
      },
    });
  };

  const handleMarkPresent = (person) => {
    setMutateIsLoadingId(person.id);
    markAttendanceMutation(person, {
      onSuccess() {
        setMutateIsLoadingId(0);
        queryClient.invalidateQueries();
      },
      onError(error) {
        setMutateIsLoadingId(0);
        throw error;
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Header with Logo and Title */}
      <header className="text-center mb-4">
        <img
          src="/logo.jpg"
          alt="Harvesters International Christian Center Logo"
          className="w-32 h-32 mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">
          Harvesters International Christian Center
        </h1>
        <h3 className="text-1xl font-bold mt-4">Awakening</h3>
      </header>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-24">
        <h1 className="text-2xl text-center font-bold mb-4">Attendance</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or phone number"
          className="w-full mb-4 p-2 border rounded-lg"
          value={query}
          onChange={handleSearch}
        />

        {/* Search Results */}
        {!isCreating && searchValue && filteredPeople?.length > 0 ? (
          <div>
            <ul className="space-y-2">
              {filteredPeople?.map((person, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span>
                      {person.firstname} {person.lastname}
                    </span>
                    {person.team ? (
                      <span className="opacity-50">
                        {person?.team} -{" "}
                        {person?.department && person?.department}
                      </span>
                    ) : (
                      <span>{person.team || person.department}</span>
                    )}
                  </div>
                  {person.ispresent ? (
                    <button
                      onClick={() => handleMarkPresent(person)}
                      className="px-2 py-2 text-sm bg-green-500 text-white rounded-lg flex justify-between cursor-not-allowed"
                    >
                      <CheckBadgeIcon className="text-white size-5" />
                      <span className="ml-3">Present</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => mutateIsLoadingId === 0 ? handleMarkPresent(person) : undefined}
                      className="px-2 py-2 text-sm bg-blue-500 text-white rounded-lg flex"
                    >
                      {mutateIsLoadingId === person.id
                        ? "Marking..."
                        : "Mark Present"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="items-center text-center">
              <div className="mt-6">OR</div>
              <button
                onClick={handleCreate}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Manually add attendance
              </button>
            </div>
          </div>
        ) : (
          <>
            {!isCreating && (
              <div className="text-center my-4">
                {isLoading && searchValue ? (
                  <p>Searching...</p>
                ) : !isLoading && searchValue ? (
                  <div>
                    <p>No results</p>
                    <button
                      onClick={handleCreate}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Manually add attendance
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}

        {/* Create Form */}
        {isCreating && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              Manually add atendance
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border rounded-lg"
                value={newPerson.firstname}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, firstname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded-lg"
                value={newPerson.lastname}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, lastname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
                value={newPerson.phonenumber}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, phonenumber: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Department eg Career and Finance"
                className="w-full p-2 border rounded-lg"
                value={newPerson.department}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, department: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Team eg Ministry, Programs"
                className="w-full p-2 border rounded-lg"
                value={newPerson.team}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, team: e.target.value })
                }
              />
              <button
                onClick={() => !manuallySaving ? handleSave() : undefined}
                className="w-full py-2 bg-blue-500 text-white rounded-lg"
              >
                {manuallySaving ? "Saving" : "Save"}
              </button>
              <button
                onClick={resetCreate}
                className="w-full py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
