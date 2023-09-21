import React from "react";
import { API_BASE_URL } from "../../config";

function SeedPage() {
  const seedDatabase = () => {
    fetch(`${API_BASE_URL}/api/seed_database`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Database seeded successfully");
      })
      .catch((error) => {
        console.error("Error seeding database:", error);
        alert("Failed to seed database");
      });
  };

  return (
    <div className='background-style'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Seed Database</h1>
        <div className='flex justify-center my-4'>
          <button
            onClick={seedDatabase}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Seed Database
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeedPage;
