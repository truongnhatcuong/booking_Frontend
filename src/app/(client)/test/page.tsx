"use client";
import React from "react";
import { get, set } from "localstorage-with-expire";
const page = () => {
  const token = get("token");

  console.log("Token value: ", token);

  return <div></div>;
};

export default page;
