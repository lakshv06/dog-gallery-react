import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import SubBreedDogsCard from "./SubBreedDogsCard";
import apiService from "../api-service/apiservice";
import { toast } from "react-toastify";
import MoreImagesCard from "./MoreImagesCard";

interface DialogBoxModalProps {
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  pickedDogBreed: string;
  pickedSubBreed: Array<string>
}

function DialogBoxModal(props: DialogBoxModalProps): ReactElement {
    const [isMoreImagesLoading, setIsMoreImagesLoading] = useState<boolean>(false);
    const [moreImageArray, setMoreImageArray] = useState<string[]>([]);
  const handleModalClose = () => {
    props.setModal(false);
  };

  const getBreedMoreImages = async()=>{
    try{
        setIsMoreImagesLoading(true);
        const response = await apiService.getBreedRandomImage(props.pickedDogBreed, 3);
        if(response.data.status==="success"){
            setMoreImageArray(response.data.message);
        }
    }
    catch{
        toast.error("Erorr in getting more images data.", {containerId: "toast-container-message"});
    }
    finally{
        setIsMoreImagesLoading(false);
    }
  }

  useEffect(()=>{
    getBreedMoreImages();
  }, [])

  return (
    <div className={`modal fade ${props.showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: props.showModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.pickedDogBreed} Images</h5>
            <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex justify-content-around">
            <p>Sub Breeds</p>
            {props.pickedSubBreed.map((subBreedName)=>(
                <div key={subBreedName}>
                     <SubBreedDogsCard subBreedName = {subBreedName} breedName = {props.pickedDogBreed}/>
                </div>
               
            ))}
          </div>
          <div className="modal-body">
            <p>More Images</p>
            {isMoreImagesLoading && (
                <div>More Images Loading...</div>
            )}
            {!isMoreImagesLoading && moreImageArray && moreImageArray.map((imageurl)=>(
                <div key={imageurl}>
                     <MoreImagesCard  imageurl = {imageurl}/>
                </div>
               
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogBoxModal;
