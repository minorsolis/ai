import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import Content from "../inc/Content";
const Component = () => {
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState();
  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
    } catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }
  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  const imageUrl = "https://picsum.photos/200/300";

  async function predictionFunction() {
    const predictions = await model.detect(document.getElementById("img"));
    console.log(predictions);
    setPredictions(predictions);
  }

  return (
    <Content
      title="Object rec"
      content={
        <div className="col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <h4>Check what's in the image.</h4>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    predictionFunction();
                  }}
                >
                  Click here to check the image
                </button>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-md-6">
                  <img id="img" crossOrigin="anonymous" src={imageUrl} />
                </div>
                <div className="col-md-6">
                  <h3>Predictions</h3>
                  {Array.isArray(predictions) &&
                    predictions.map((row, index) => {
                      return (
                        <li>
                          {row.class}: {(row.score * 100).toFixed(2)}%
                        </li>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Component;
