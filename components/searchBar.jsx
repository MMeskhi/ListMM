import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="text-gray-950 indent-1 w-full bg-gray-50 py-1 rounded-sm shadow-sm outline-none focus:shadow-md"
      />
      <button
        type="submit"
        className="absolute top-2/4 -translate-y-2/4 right-0 py-px px-1 mr-0.5 border border-gray-700 text-gray-200 bg-gray-800 rounded-sm active:opacity-95 active:scale-95 duration-100"
      >
        Search
      </button>
    </form>
  );
}
