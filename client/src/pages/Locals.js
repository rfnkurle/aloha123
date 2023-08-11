import React from "react";

import { useQuery } from "@apollo/client";
import { FIND_LOCALS } from "../utils/queries";
import LocalsNavbar from "../components/LocalsNavBar";
import LocalsCard from "../components/LocalsCard";
import "../styles/Locals.css";

const Locals = () => {
  const { data } = useQuery(FIND_LOCALS);
  const localsData = data?.findLocals || [];
  console.log(localsData);

  return (
    <>
      <LocalsNavbar />

      <LocalsCard />
    </>
  );
};

export default Locals;
