import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import Content from "../inc/Content";
const Component = () => {
  const [model, setModel] = useState();
  const [run, setRun] = useState(false);
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

  const webcamRef = React.useRef(null);
  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);
  const videoConstraints = {
    height: 1080,
    width: 1920,
    facingMode: "environment",
  };

  async function predictionFunction() {
    //Clear the canvas for each prediction
    var cnvs = document.getElementById("myCanvas");
    var ctx = cnvs.getContext("2d");
    ctx.clearRect(
      0,
      0,
      webcamRef.current.video.videoWidth,
      webcamRef.current.video.videoHeight
    );
    //Start prediction
    const predictions = await model.detect(document.getElementById("img"));
    if (predictions.length > 0) {
      console.log(predictions);
      for (let n = 0; n < predictions.length; n++) {
        console.log(n);
        if (predictions[n].score > 0.8) {
          //Threshold is 0.8 or 80%
          //Extracting the coordinate and the bounding box information
          let bboxLeft = predictions[n].bbox[0];
          let bboxTop = predictions[n].bbox[1];
          let bboxWidth = predictions[n].bbox[2];
          let bboxHeight = predictions[n].bbox[3] - bboxTop;
          console.log("bboxLeft: " + bboxLeft);
          console.log("bboxTop: " + bboxTop);
          console.log("bboxWidth: " + bboxWidth);
          console.log("bboxHeight: " + bboxHeight);
          //Drawing begin
          ctx.beginPath();
          ctx.font = "28px Arial";
          ctx.fillStyle = "red";
          ctx.fillText(
            predictions[n].class +
              ": " +
              Math.round(parseFloat(predictions[n].score) * 100) +
              "%",
            bboxLeft,
            bboxTop
          );
          ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
          ctx.strokeStyle = "#FF0000";
          ctx.lineWidth = 3;
          ctx.stroke();
          console.log("detected");
        }
      }
    }
    //Rerun prediction by timeout
    setTimeout(() => predictionFunction(), 500);
  }

  return (
    <Content
      title="Object rec"
      content={
        <div className="col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <h4>Open the camera of the device (abra la camara).</h4>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-sm-12">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      predictionFunction();
                    }}
                  >
                    Start Detect
                  </button>
                </div>

                <div className="col-sm-12 mt-2">
                  <div style={{ position: "absolute", top: "100px" }}>
                    <Webcam
                      audio={false}
                      id="img"
                      ref={webcamRef}
                      screenshotQuality={1}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "100px",
                      zIndex: "9999",
                    }}
                  >
                    <canvas
                      id="myCanvas"
                      width={videoWidth}
                      height={videoHeight}
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
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
