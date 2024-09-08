import { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState([
    { firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', department: 'HR' },
    { firstName: 'Jane', lastName: 'Smith', phoneNumber: '0987654321', department: 'IT' }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPerson, setNewPerson] = useState({ firstName: '', lastName: '', phoneNumber: '', department: '' });

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setPeople([...people, newPerson]);
    setNewPerson({ firstName: '', lastName: '', phoneNumber: '', department: '' });
    setIsCreating(false);
  };

  const handleMarkPresent = (person) => {
    alert(`${person.firstName} ${person.lastName} is present!`);
  };

  const filteredPeople = people.filter(
    (person) =>
      person.firstName.toLowerCase().includes(query.toLowerCase()) ||
      person.lastName.toLowerCase().includes(query.toLowerCase()) ||
      person.phoneNumber.includes(query)
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
       {/* Header with Logo and Title */}
       <header className="text-center mb-4">
        <img src="/logo.jpg" alt="Harvesters International Christian Center Logo" className="w-32 h-32 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Harvesters International Christian Center</h1>
        <h3 className="text-2xl font-bold mt-4">Awakening</h3>
      </header>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-24">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or phone number"
          className="w-full mb-4 p-2 border rounded-lg"
          value={query}
          onChange={handleSearch}
        />

        {/* Search Results */}
        {filteredPeople.length > 0 ? (
          <ul className="space-y-2">
            {filteredPeople.map((person, index) => (
              <li key={index} className="p-4 border rounded-lg flex justify-between items-center">
                <span>{person.firstName} {person.lastName} ({person.phoneNumber})</span>
                <button
                  onClick={() => handleMarkPresent(person)}
                  className="px-2 py-2 bg-blue-500 text-white rounded-lg"
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
                value={newPerson.firstName}
                onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded-lg"
                value={newPerson.lastName}
                onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
                value={newPerson.phoneNumber}
                onChange={(e) => setNewPerson({ ...newPerson, phoneNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full p-2 border rounded-lg"
                value={newPerson.department}
                onChange={(e) => setNewPerson({ ...newPerson, department: e.target.value })}
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

export default App;
