import { ReactElement } from "react";

interface MoreImagesCardProps{
    imageurl: string;
}

function MoreImagesCard(props: MoreImagesCardProps): ReactElement{
    return (
        <div className="card">
        <div className="card-body">
          {props.imageurl && (
            <img
              alt={`dog smiling`}
              src={props.imageurl}
              className="col-12" // Ensure image fills the card body
            />
          )}
        </div>
      </div>
    )
}

export default MoreImagesCard;