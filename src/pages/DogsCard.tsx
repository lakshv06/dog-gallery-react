import { ReactElement, useEffect, useState } from "react";
import apiService from "../api-service/apiservice";
import DialogBoxModal from "./DialogBoxModal";

interface DogBreedPageProps {
  dogBreed: string;
}

function DogsCard({ dogBreed }: DogBreedPageProps): ReactElement {
  const [dogImageData, setDogImageData] = useState<string | null>(null);
  const [subBreedListData, setSubBreedListData] = useState<string[] | null>(null);
  const [showDogCardModal, setShowDogCardModal] = useState<boolean>(false);
  const [pickSubBreedName, setPickSubBreedName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getDogImageData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDogBreedRandomImage(dogBreed);
      if (response.data.status === "success") {
        setDogImageData(response.data.message);
      } else {
        setError("Failed to get dog image.");
      }
    } catch (e) {
      console.error("Error fetching dog image:", e);
      setError("Error fetching dog image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDogImageData(); // Fetch image on component mount or when dogBreed changes
  }, [dogBreed]);

  const dogSubBreedList = async () => {
    try {
      setLoading(true); // Start loading while fetching sub-breeds
      const response = await apiService.getAllSubBreedList(dogBreed);
      if (response.data.status === "success") {
        setSubBreedListData(response.data.message);
        if (response.data.message.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.message.length);
          setPickSubBreedName(response.data.message[randomIndex]); // Pick a random sub-breed
        }
      } else {
        console.error("Failed to fetch sub-breed list");
      }
    } catch (e) {
      console.error("Error fetching sub-breed list:", e);
      setError("Error fetching sub-breed list.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleClick = () => {
    setShowDogCardModal(true); // Show modal on click
    dogSubBreedList(); // Fetch sub-breeds on click
  };

  return (
    <div className="col-6 d-flex flex-grow">
      <div className="card">
        <div className="card-body" onClick={handleClick}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {dogImageData && (
            <img
              alt={`${dogBreed} dog smiling`}
              src={dogImageData}
              className="col-12" // Ensure image fills the card body
            />
          )}
          <h1>{dogBreed}</h1> {/* Display the dog breed name */}
        </div>
      </div>

      {/* Display the modal if the state indicates it should be shown */}
      {showDogCardModal && !loading && (
        <DialogBoxModal
          showModal={showDogCardModal}
          setModal={setShowDogCardModal} // Pass the setModal function to close the modal
        />
      )}
    </div>
  );
}

export default DogsCard;
