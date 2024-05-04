import React, { useEffect, useState, ReactElement } from "react";
import { toast } from "react-toastify";
import apiService from "../api-service/apiservice";
import DogsCard from "./DogsCard";

function HomePage(): ReactElement {
  const [allDogsData, setAllDogsData] = useState<string[]>([]);

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

  return (
    <div className="container"> {/* Ensure container for grid layout */}
      {/* Navigation */}
      <form className="d-flex my-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={() => toast.info("Search clicked")}
        >
          Search
        </button>
      </form>

      {allDogsData.length > 0 ? (
        <div className="row gy-4"> {/* Use row with vertical spacing (gy) */}
          {allDogsData.map((dogBreed) => (
            <div className="col-4" key={dogBreed}> {/* Each card occupies 1/3 of the row */}
              <DogsCard dogBreed={dogBreed} />
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
}

export default HomePage;
