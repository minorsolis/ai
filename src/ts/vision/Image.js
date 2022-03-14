import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import ContainerComponent from "../../mui/Container";
import Box from "@mui/material/Box";

const Component = () => {
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState();
  const [imageUrl, setImageUrl] = useState();

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

  async function predictionFunction() {
    const predictions = await model.detect(document.getElementById("img"));
    console.log(predictions);
    setPredictions(predictions);
  }

  const changeImg = () => {
    let images = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/American_Eskimo_Dog.jpg/360px-American_Eskimo_Dog.jpg",
      "https://upload.wikimedia.org/wikipedia/en/b/b7/Pic_of_my_house.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Picture_of_my_dog_to_test_uploading_on_wikipedia.jpg/1536px-Picture_of_my_dog_to_test_uploading_on_wikipedia.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Alitalia.a320-200.i-bikc.arp.jpg/1200px-Alitalia.a320-200.i-bikc.arp.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Toyota_Prius_V_Hybrid_car_family.jpg/2560px-Toyota_Prius_V_Hybrid_car_family.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Surf_en_el_oceano.JPG",
    ];
    let num = Math.floor(Math.random() * images.length);
    console.log("num", num);
    setImageUrl(images[num]);
    setPredictions();
  };

  useEffect(() => {
    changeImg();
  }, []);

  return (
    <ContainerComponent>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <h4>Check what's in the image.</h4>
          <p>
            This code will allow us to read a random image from the internet and
            predict what's on it. I test it with just a few images including the
            house to check how the model may fail.
          </p>
          <div>
            <button
              className="mr-3 btn btn-info"
              onClick={() => {
                changeImg();
              }}
            >
              Change image
            </button>

            <button
              className="btn btn-success"
              disabled={!model}
              onClick={() => {
                predictionFunction();
              }}
            >
              Predict the content
            </button>
          </div>
        </div>
        <Box>
          <div className="mt-3 col-md-6">
            <h3>Predictions</h3>
            {Array.isArray(predictions) &&
              predictions.map((row, index) => {
                return row.class == "bicycle" ? (
                  "."
                ) : (
                  <li key={index}>
                    {row.class}: {(row.score * 100).toFixed(2)}%
                  </li>
                );
              })}
          </div>
        </Box>
        <div className="row mt-5 no-gutters align-items-center">
          <div className="col-md-6">
            <img id="img" width="400" crossOrigin="anonymous" src={imageUrl} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default Component;
