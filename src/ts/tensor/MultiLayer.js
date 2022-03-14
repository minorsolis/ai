import React from "react";
import ContainerComponent from "../../mui/Container";
import * as tf from "@tensorflow/tfjs";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
    tf.layers.dense({ inputShape: [1], units: 25, activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 5, activation: "relu" }));
  //   model.add(tf.layers.dense({ units: 1 }));
  model.add(tf.layers.dense({ units: 1 }));

  model.summary();

  const LEARNING_RATE = 0.0001;
  const OPTIMIZER = tf.train.sgd(LEARNING_RATE);

  function evaluate() {
    tf.tidy(function () {
      let newInput = normalize(
        tf.tensor1d([7]),
        FEATURE_RESULTS.MIN_VALUES,
        FEATURE_RESULTS.MAX_VALUES
      );
      let output = model.predict(newInput.NORMALIZED_VALUES);
      console.log("Expected result = 49 - Result = ");
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
    console.log(
      "Data for epoch " + epoch + ": ",
      Math.sqrt(logs.loss).toFixed(2) + "%"
    );
    if (epoch == 70) {
      OPTIMIZER.setLearningRate(LEARNING_RATE / 2);
    }
  }

  train();

  return (
    <ContainerComponent>
      <Grid>
        <Paper sx={{ padding: 2 }}>
          <Box>
            <h3>Multi-layer tensors</h3>
          </Box>
          <Box>
            I used this based code to estimate a logaritmic function. So instead
            of a line, we are trying to build 3 lines to predict the number.
            <br />
            <br />* Check the console log to see the estimations. It's trying to
            predict (7 * 7) = 49. <br />
            <img
              className="img-thumbnail img-responsive"
              src="https://courses.edx.org/assets/courseware/v1/7eb3e72ee58bb046d45123e9d031c1be/asset-v1:Google+WebML102+3T2021+type@asset+block/Figure_4.5.2.6.png"
            />
          </Box>
          <Box>
            <br />
            <h3>Training Data: </h3>
            {INPUTS.map((row, index) => {
              return (
                <li key={index}>
                  [ {row} ] = sq = [ {OUTPUTS[index]} ]
                </li>
              );
            })}
          </Box>
        </Paper>
      </Grid>
    </ContainerComponent>
  );
};

export default Component;
