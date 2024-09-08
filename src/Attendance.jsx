import { useSearchWorker } from "./services/search";

const { useState } = require("react");

const Attendance = () => {
  const [query, setQuery] = useState("");
  const { data } = useSearchWorker(query);
  const [people, setPeople] = useState([
    {
      firstname: "John",
      lastname: "Doe",
      phonenumber: "1234567890",
      department: "HR",
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      phonenumber: "0987654321",
      department: "IT",
    },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPerson, setNewPerson] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    department: "",
  });

  console.log({ data: data?.map((o) => o) });

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setPeople([...people, newPerson]);
    setNewPerson({
      firstname: "",
      lastname: "",
      phonenumber: "",
      department: "",
    });
    setIsCreating(false);
  };

  const handleMarkPresent = (person) => {
    alert(`${person.firstname} ${person.lastname} is present!`);
  };

  const filteredPeople = data?.filter(
    (person) =>
      person?.firstname?.toLowerCase().includes(query.toLowerCase()) ||
      person?.lastname?.toLowerCase().includes(query.toLowerCase()) ||
      person?.phonenumber?.includes(query)
  );

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
        {filteredPeople?.length > 0 ? (
          <ul className="space-y-2">
            {filteredPeople?.map((person, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <span>
                  {person.firstname} {person.lastname} ({person.phonenumber})
                </span>
                <button
                  onClick={() => handleMarkPresent(person)}
                  className="px-2 py-2 text-sm bg-blue-500 text-white rounded-lg"
                >
                  Mark Present
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center my-4">
            <p>No results found.</p>
            <button
              onClick={handleCreate}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Create
            </button>
          </div>
        )}

        {/* Create Form */}
        {isCreating && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Create New Person</h2>
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
                placeholder="Department"
                className="w-full p-2 border rounded-lg"
                value={newPerson.department}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, department: e.target.value })
                }
              />
              <button
                onClick={handleSave}
                className="w-full py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
