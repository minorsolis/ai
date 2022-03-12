import React from "react";
import ContainerComponent from "../../mui/Container";
import * as tf from "@tensorflow/tfjs";

const Component = () => {
  const INPUTS = [];
  for (let n = 1; n <= 20; n++) {
    INPUTS.push(n);
  }
  const OUTPUTS = [];
  for (let n = 0; n < INPUTS.length; n++) {
    OUTPUTS.push(INPUTS[n] * INPUTS[n]);
  }

  tf.util.shuffleCombo(INPUTS, OUTPUTS);
  const INPUTS_TENSOR = tf.tensor1d(INPUTS);
  const OUTPUTS_TENSOR = tf.tensor1d(OUTPUTS);

  function normalize(tensor, min, max) {
    const result = tf.tidy(function () {
      const MIN_VALUES = min || tf.min(tensor, 0);
      const MAX_VALUES = max || tf.max(tensor, 0);
      const TENSOR_SUBTRACT_MIN_VALUE = tf.sub(tensor, MIN_VALUES);
      const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);
      const NORMALIZED_VALUES = tf.div(TENSOR_SUBTRACT_MIN_VALUE, RANGE_SIZE);
      return { NORMALIZED_VALUES, MIN_VALUES, MAX_VALUES };
    });

    return result;
  }

  const FEATURE_RESULTS = normalize(INPUTS_TENSOR);
  console.log("Normalized Values:");
  FEATURE_RESULTS.NORMALIZED_VALUES.print();
  console.log("Min Values:");
  FEATURE_RESULTS.MIN_VALUES.print();
  console.log("Max Values:");
  FEATURE_RESULTS.MAX_VALUES.print();
  INPUTS_TENSOR.dispose();

  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [1], units: 20, activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 1 }));

  model.summary();

  const LEARNING_RATE = 0.001;
  const OPTIMIZER = tf.train.sgd(LEARNING_RATE);

  function evaluate() {
    tf.tidy(function () {
      let newInput = normalize(
        tf.tensor1d([7]),
        FEATURE_RESULTS.MIN_VALUES,
        FEATURE_RESULTS.MAX_VALUES
      );
      let output = model.predict(newInput.NORMALIZED_VALUES);
      output.print();
    });
    FEATURE_RESULTS.MIN_VALUES.dispose();
    FEATURE_RESULTS.MAX_VALUES.dispose();
    model.dispose();
    console.log(tf.memory().numTensors);
  }

  async function train() {
    // Choose a learning rate that is suitable for the data we are using.
    model.compile({
      optimizer: tf.train.sgd(LEARNING_RATE),
      loss: "meanSquaredError",
    });
    // Finally do the training itself
    let results = await model.fit(
      FEATURE_RESULTS.NORMALIZED_VALUES,
      OUTPUTS_TENSOR,
      {
        callbacks: { onEpochEnd: logProgress },
        shuffle: true,
        batchSize: 2,
        epochs: 200,
      }
    );
    OUTPUTS_TENSOR.dispose();
    FEATURE_RESULTS.NORMALIZED_VALUES.dispose();
    console.log(
      "Average error loss: " +
        Math.sqrt(results.history.loss[results.history.loss.length - 1])
    );
    evaluate();
  }

  function logProgress(epoch, logs) {
    console.log("Data for epoch " + epoch, Math.sqrt(logs.loss));
    if (epoch == 70) {
      OPTIMIZER.setLearningRate(LEARNING_RATE / 2);
    }
  }

  train();

  return (
    <ContainerComponent>
      <div className="col-md-12">
        <h3>Multi-layer tensors</h3>
        <p>
          Same as the House Prices but using a logaritmic function to train and
          test the model
        </p>
        <p>
          {" "}
          <strong>
            Please use the console to inspect the calculations.{" "}
          </strong>{" "}
        </p>
        <pre>
          {`
 const INPUTS = [];
 for (let n = 1; n <= 20; n++) {
   INPUTS.push(n);
 }
 const OUTPUTS = [];
 for (let n = 0; n < INPUTS.length; n++) {
   OUTPUTS.push(INPUTS[n] * INPUTS[n]);
 }

 tf.util.shuffleCombo(INPUTS, OUTPUTS);
 const INPUTS_TENSOR = tf.tensor1d(INPUTS);
 const OUTPUTS_TENSOR = tf.tensor1d(OUTPUTS);

 function normalize(tensor, min, max) {
   const result = tf.tidy(function () {
	 const MIN_VALUES = min || tf.min(tensor, 0);
	 const MAX_VALUES = max || tf.max(tensor, 0);
	 const TENSOR_SUBTRACT_MIN_VALUE = tf.sub(tensor, MIN_VALUES);
	 const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);
	 const NORMALIZED_VALUES = tf.div(TENSOR_SUBTRACT_MIN_VALUE, RANGE_SIZE);
	 return { NORMALIZED_VALUES, MIN_VALUES, MAX_VALUES };
   });

   return result;
 }

 const FEATURE_RESULTS = normalize(INPUTS_TENSOR);
 console.log("Normalized Values:");
 FEATURE_RESULTS.NORMALIZED_VALUES.print();
 console.log("Min Values:");
 FEATURE_RESULTS.MIN_VALUES.print();
 console.log("Max Values:");
 FEATURE_RESULTS.MAX_VALUES.print();
 INPUTS_TENSOR.dispose();

 const model = tf.sequential();
 model.add(
   tf.layers.dense({ inputShape: [1], units: 20, activation: "relu" })
 );
 model.add(tf.layers.dense({ units: 1 }));

 model.summary();

 const LEARNING_RATE = 0.001;
 const OPTIMIZER = tf.train.sgd(LEARNING_RATE);

 function evaluate() {
   tf.tidy(function () {
	 let newInput = normalize(
	   tf.tensor1d([7]),
	   FEATURE_RESULTS.MIN_VALUES,
	   FEATURE_RESULTS.MAX_VALUES
	 );
	 let output = model.predict(newInput.NORMALIZED_VALUES);
	 output.print();
   });
   FEATURE_RESULTS.MIN_VALUES.dispose();
   FEATURE_RESULTS.MAX_VALUES.dispose();
   model.dispose();
   console.log(tf.memory().numTensors);
 }

 async function train() {
   // Choose a learning rate that is suitable for the data we are using.
   model.compile({
	 optimizer: tf.train.sgd(LEARNING_RATE),
	 loss: "meanSquaredError",
   });
   // Finally do the training itself
   let results = await model.fit(
	 FEATURE_RESULTS.NORMALIZED_VALUES,
	 OUTPUTS_TENSOR,
	 {
	   callbacks: { onEpochEnd: logProgress },
	   shuffle: true,
	   batchSize: 2,
	   epochs: 200,
	 }
   );
   OUTPUTS_TENSOR.dispose();
   FEATURE_RESULTS.NORMALIZED_VALUES.dispose();
   console.log(
	 "Average error loss: " +
	   Math.sqrt(results.history.loss[results.history.loss.length - 1])
   );
   evaluate();
 }

 function logProgress(epoch, logs) {
   console.log("Data for epoch " + epoch, Math.sqrt(logs.loss));
   if (epoch == 70) {
	 OPTIMIZER.setLearningRate(LEARNING_RATE / 2);
   }
 }

 train();
	
	`}
        </pre>
      </div>
    </ContainerComponent>
  );
};

export default Component;
