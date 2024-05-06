import React, { useEffect, useState, ReactElement } from "react";
import { toast } from "react-toastify";
import apiService from "../api-service/apiservice";
import DogsCard from "./DogsCard";

function HomePage(): ReactElement {
  const [allDogsData, setAllDogsData] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to track search term

  const handleAllDogsData = async () => {
    try {
      const response = await apiService.getAllDogs();

      if (response.data.status === "success") {
        setAllDogsData(Object.keys(response.data.message));
      }
    } catch (error) {
      console.error("Error fetching all dogs data:", error);
      toast.error("Error fetching all dogs data");
    }
  };

  useEffect(() => {
    handleAllDogsData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term on input change
  };

  // Filter the dogs data based on the search term
  const filteredDogsData = allDogsData.filter(
    (dogBreed) => dogBreed.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive filtering
  );

  return (
    <div className="container">
      {/* Navigation */}
      <form className="d-flex my-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for a dog breed"
          aria-label="Search"
          value={searchTerm} // Bind the search term state to the input value
          onChange={handleSearchChange} // Update the search term on input change
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={() => toast.info("Search clicked", {containerId: "toast-container-message"})}
        >
          Search
        </button>
      </form>

      {filteredDogsData.length > 0 ? (
        <div className="row gy-4">
          {filteredDogsData.map((dogBreed) => (
            <div className="col-4" key={dogBreed}>
              {" "}
              {/* Each card occupies 1/3 of the row */}
              <DogsCard dogBreed={dogBreed} />
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div> // Displayed when no matches found
      )}
    </div>
  );
}

export default HomePage;
