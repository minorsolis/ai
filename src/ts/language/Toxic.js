import React, { useEffect, useState, useRef } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import * as tf from "@tensorflow/tfjs";
import ContainerComponent from "../../mui/Container";

const sentences = [
  "you suck",
  "idiot",
  "this text is soo stupid",
  "today is great day!",
  "I don't care",
];

const Component = () => {
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState();
  const [phrase, setPhare] = useState();

  async function loadModel() {
    try {
      const threshold = 0.9;
      const model = await toxicity.load(threshold);
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
    setPredictions([]);
    let num = Math.floor(Math.random() * sentences.length);
    let temPhrase = sentences[num];
    setPhare(temPhrase);
    let pred = await model.classify([temPhrase]);
    setPredictions(pred);
    console.log("predictions", predictions);
  }

  return (
    <ContainerComponent>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <h4>Toxicity of the text.</h4>
        </div>
        <div className="row">
          <p>This model can be used to evaluate reviews and comments.</p>
        </div>
        <div className="row no-gutters align-items-center">
          <div className="col-sm-12 mt-3">
            Check this:
            {Array.isArray(sentences) &&
              sentences.map((row, index) => {
                return <li key={index}>{row}</li>;
              })}
          </div>

          <div className="col-sm-12">
            <button
              className="btn btn-success"
              disabled={!model}
              onClick={() => {
                predictionFunction();
              }}
            >
              Random Sentence Detection
            </button>
          </div>

          <div className="col-sm-12 mt-3">
            <hr />
            <strong>Results: {phrase} </strong>
            {predictions &&
              Array.isArray(predictions) &&
              predictions.map((row, index) => {
                return (
                  <li
                    key={index}
                    className={row.results[0].match ? "text-success" : ""}
                  >
                    {row.label}: {row.results[0].match ? "Yep" : "Nope"}
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default Component;
