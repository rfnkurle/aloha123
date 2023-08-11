import React from "react";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import { useQuery } from "@apollo/client";
import { FIND_LOCALS } from "../utils/queries";
import "../styles/Locals.css";

const LocalsCard = () => {
  const { data } = useQuery(FIND_LOCALS);
  const localsData = data?.findLocals || [];
  console.log(localsData);

  return (
    <>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {localsData.map((localsData) => {
          return (
            <MDBCol>
              <MDBCard className="our-locals">
                <MDBCardImage
                  // src="https://mdbootstrap.com/img/new/standard/city/044.webp"
                  // src="https://mymodernmet.com/wp/wp-content/uploads/archive/kCNkeHozTY469iw7DRRo_dianakim1.jpg"
                  // src="https://wehco.media.clients.ellingtoncms.com/timesfreepress/img/photos/2014/09/10/88050b5e08504e7cb859abadc25ae18c_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d"
                  src={localsData.image}
                  alt="..."
                  position="top"
                  className="local-images"
                />
                <MDBCardBody>
                  <MDBCardTitle className="local-name">
                    {localsData.name}
                  </MDBCardTitle>
                  <div>
                    <MDBCardText>
                      <div>
                        <h7 className="card-text-prompts">Hometown:</h7>
                        <p class="card-text-answers">{localsData.hometown}</p>
                      </div>
                      <div>
                        <h7 className="card-text-prompts">
                          What would you like people in the neighborhood to know
                          about you?
                        </h7>
                        <p class="card-text-answers">{localsData.whatToKnow}</p>
                      </div>
                      <div>
                        <h7 className="card-text-prompts">
                          What things/support would benefit you the most?
                        </h7>
                        <p class="card-text-answers">{localsData.support}</p>
                      </div>
                      <div>
                        <h7 className="card-text-prompts">
                          Where can your community members find you?
                        </h7>
                        <p class="card-text-answers">
                          {localsData.whereAreYou}
                        </p>
                      </div>
                    </MDBCardText>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>
    </>
  );
};

export default LocalsCard;
