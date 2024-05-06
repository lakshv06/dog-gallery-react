import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiService from "../api-service/apiservice";

interface SubBreedDogsCardProps {
  subBreedName: string;
  breedName: string;
}

function SubBreedDogsCard(props: SubBreedDogsCardProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [dogSubBreedImageData, setDogSubBreedImageData] = useState<string | null>(null);

  const fetchSubBreedImage = async ()=>{
    try{
        setLoading(true);
        const response = await apiService.getSubBreedRandomImageUrl(props.breedName, props.subBreedName)
        if(response.data.status==="success"){
            console.log("Picked SubBreed: ", response.data.message);
            setDogSubBreedImageData(response.data.message);
        }
    }
    catch(error){
        toast.error("Error in fetching Sub Breed Dog Image.");
    }
    finally{
        setLoading(false);
    }
  }

    useEffect(()=>{
        fetchSubBreedImage()
    }, [])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          {loading && <p>Loading...</p>}
          {dogSubBreedImageData && !loading && (
            <img
              alt={`${dogSubBreedImageData} dog smiling`}
              src={dogSubBreedImageData}
              className="col-12" // Ensure image fills the card body
            />
          )}
          <h1>{props.subBreedName}</h1> {/* Display the dog breed name */}
        </div>
      </div>
    </div>
  );
}

export default SubBreedDogsCard;
