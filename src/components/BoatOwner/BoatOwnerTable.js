import React, { useState } from "react";
import Image from 'next/image';
import { FaEdit, FaTrash } from "react-icons/fa";

const BoatOwnerTable = ({
  boatOwners,
  handleDelete,
  handleEdit,
  handleToggle,
  availability,
  isEditing,
  setIsEditing,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredOwners = boatOwners.filter((owner) => {
    const matchesName = owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && owner.isAvailable) ||
      (availabilityFilter === "unavailable" && !owner.isAvailable);

    return matchesName && matchesAvailability;
  });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Boat Owners List</h2>

      {/* Search & Filter Controls */}
      <div className="flex justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Image</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Father Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Middle Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr key={owner._id} className="border-b">
                <td className="py-3 px-4 text-gray-800">
                  {owner.imageUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                      <Image
                        src={owner.imageUrl}
                        alt="Boat Owner"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span>No image available</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-800">{owner.name}</td>
                <td className="py-3 px-4 text-gray-800">{owner.fatherName}</td>
                <td className="py-3 px-4 text-gray-800">{owner.middleName}</td>
                <td className="py-3 px-4 text-gray-800">{owner.phone}</td>
                <td className="py-3 px-4 flex gap-3 items-center">
                  <button
                    onClick={() => handleEdit(owner)}
                    className="text-yellow-500 hover:text-yellow-600 text-xl"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(owner._id)}
                    className="text-red-500 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
                <td
                  className="py-3 px-4 text-gray-800 cursor-pointer"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <div className="relative space-x-2">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleToggle(true, owner._id)}
                      >
                        Available
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleToggle(false, owner._id)}
                      >
                        Unavailable
                      </button>
                    </div>
                  ) : owner.availability ? (
                    <span className="text-green-600 font-semibold">Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unavailable</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredOwners.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No boat owners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoatOwnerTable;
