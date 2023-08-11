import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import Post from "../components/Post";
import SideNav from "../components/SideNav";
import FeedCard from "../components/feedCard";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <SideNav />
          </Col>
          <Col id="page-content-wrapper">
            <div id="total-feed">
              <Post></Post>
              <Container id="feed-container">
                <FeedCard></FeedCard>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};

export default Dashboard;
