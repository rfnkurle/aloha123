// import style package here with specific style components
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { MdOutlinePersonPin } from "react-icons/md";
import { X } from "react-bootstrap-icons";
import { FIND_ALL } from "../utils/queries";
import { UPDATE_FEED } from "../utils/mutations";
import { DELETE_FEED } from "../utils/mutations";
import "../styles/FeedCard.css";

const FeedCard = () => {
  // space for any variables like useState
  const { error, data } = useQuery(FIND_ALL);
  const useData = data?.findAll || [];
  console.log(error);

  // set and change problem status by clicking checkbox in feedCard
  const [resolved, setResolved] = useState(false);
  console.log("default resolved: ", resolved);

  const [updateResolve] = useMutation(
    UPDATE_FEED,

    {
      refetchQueries: [{ query: FIND_ALL }],
    }
  );

  const resovedBoxHandler = async (_id) => {
    setResolved((resolved) => !resolved);
    // console.log("statusCheck: ", status)
    // is this overriding all other data?
    try {
      const { data } = await updateResolve({
        variables: {
          feedId: _id,

          feedData: { problem: resolved },
        },
      });
      console.log("Resolved Data: ", data);
    } catch (e) {
      console.error("resolve error", e);
    }
  };

  // delete feed

  const [deleteFeed] = useMutation(DELETE_FEED);

  const deletePostHandler = async (_id) => {
    try {
      const { data } = await deleteFeed({
        variables: {
          feedId: _id,
        },
      });
      console.log("deleteID: ");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="feed-card">
      {useData.map((user) => {
        return (
          <>
            {user.liveFeed.map((feed, index) => {
              return (
                <div className="feed-container">
                  <div>
                    {feed.problem === true ? (
                      <Card
                        id="problem-card"
                        style={{ width: "50rem", backgroundColor: "" }}
                      >
                        <Card.Body>
                          <Card.Title id="name">
                            <MdOutlinePersonPin /> {user.firstname}{" "}
                            {user.lastname}{" "}
                          </Card.Title>
                          <Card.Subtitle id="date" className="mb-2">
                            {feed.createdAt}
                          </Card.Subtitle>
                          <br></br>
                          <Card.Subtitle className="status" id="status-problem">
                            <br></br>
                            {feed.status}
                          </Card.Subtitle>
                          <label className="resolveCheckboxTitle align-bottom">
                            <input
                              type="checkbox"
                              name="resolveCheckbox"
                              className="resolveCheckbox"
                              onChange={() =>
                                resovedBoxHandler(feed._id, feed.status)
                              }
                            />
                            &nbsp;&nbsp;Check if this problem is resolved
                          </label>
                          {/* activate below - only writer can delete the post */}
                          {/* {user&& user._id === user.ID && */}
                          <Button
                            className="deleteBtn"
                            type="submit"
                            onClick={() => deletePostHandler(feed._id)}
                          >
                            <X />
                          </Button>
                          {/* } */}
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card style={{ width: "50rem" }}>
                        <Card.Body>
                          <Card.Title id="name">
                            <MdOutlinePersonPin /> {user.firstname}{" "}
                            {user.lastname}{" "}
                          </Card.Title>
                          <Card.Subtitle id="date" className="mb-2t">
                            {feed.createdAt}
                          </Card.Subtitle>
                          <Card.Subtitle className="status">
                            <br></br>
                            {feed.status}
                          </Card.Subtitle>
                          <Button
                            className="deleteBtn"
                            type="submit"
                            onClick={() => deletePostHandler(feed._id)}
                          >
                            <X />
                          </Button>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};
export default FeedCard;
