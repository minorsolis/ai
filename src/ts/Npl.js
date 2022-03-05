import React, { useRef, useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";

import { Fragment } from "react";

const Component = () => {
  const passageRef = useRef(null);
  const questionRef = useRef(null);

  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Loaded");
  };

  return <div>HERE</div>;
};

export default Component;
