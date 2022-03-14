import React from "react";
import ContainerComponent from "../../mui/Container";
import { TRAINING_DATA } from "../../data/RealEstate";
import * as tf from "@tensorflow/tfjs";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const Component = () => {
  const [values, setValues] = React.useState({});

  // Input feature pairs (House size, Number of Bedrooms)
  const INPUTS = TRAINING_DATA.inputs;
  // Current listed house prices in dollars given their features above
  // (target output values you want to predict).
  const OUTPUTS = TRAINING_DATA.outputs;
  // Shuffle the two arrays in the same way so inputs still match outputs indexes.
  tf.util.shuffleCombo(INPUTS, OUTPUTS);
  // Input feature Array of Arrays needs 2D tensor to store.
  const INPUTS_TENSOR = tf.tensor2d(INPUTS);
  // Output can stay 1 dimensional.
  const OUTPUTS_TENSOR = tf.tensor1d(OUTPUTS);

  // Function to take a Tensor and normalize values

  // with respect to each column of values contained in that Tensor.

  function normalize(tensor, min, max) {
    const result = tf.tidy(function () {
      // Find the minimum value contained in the Tensor.
      const MIN_VALUES = min || tf.min(tensor, 0);
      // Find the maximum value contained in the Tensor.
      const MAX_VALUES = max || tf.max(tensor, 0);
      // Now subtract the MIN_VALUE from every value in the Tensor
      // And store the results in a new Tensor.
      const TENSOR_SUBTRACT_MIN_VALUE = tf.sub(tensor, MIN_VALUES);
      // Calculate the range size of possible values.
      const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);
      // Calculate the adjusted values divided by the range size as a new Tensor.
      const NORMALIZED_VALUES = tf.div(TENSOR_SUBTRACT_MIN_VALUE, RANGE_SIZE);
      return { NORMALIZED_VALUES, MIN_VALUES, MAX_VALUES };
    });

    return result;
  }

  // Normalize all input feature arrays and then
  // dispose of the original non normalized Tensors.
  const FEATURE_RESULTS = normalize(INPUTS_TENSOR);
  console.log("Normalized Values:");
  FEATURE_RESULTS.NORMALIZED_VALUES.print();
  console.log("Min Values:");
  FEATURE_RESULTS.MIN_VALUES.print();
  console.log("Max Values:");
  FEATURE_RESULTS.MAX_VALUES.print();
  INPUTS_TENSOR.dispose();

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [2], units: 1 }));

  function evaluate() {
    // Predict answer for a single piece of data.
    tf.tidy(function () {
      let newInput = normalize(
        tf.tensor2d([[750, 1]]),
        FEATURE_RESULTS.MIN_VALUES,
        FEATURE_RESULTS.MAX_VALUES
      );
      let output = model.predict(newInput.NORMALIZED_VALUES);
      output.print();
      console.log("Result ==", output);
    });
    // Finally when you no longer need to make any more predictions,
    // clean up the remaining Tensors.
    FEATURE_RESULTS.MIN_VALUES.dispose();
    FEATURE_RESULTS.MAX_VALUES.dispose();
    model.dispose();
    console.log(tf.memory().numTensors);
  }

  async function train() {
    const LEARNING_RATE = 0.01; // Choose a learning rate that’s suitable for the data we are using.
    // Compile the model with the defined learning rate and specify a loss function to use.
    model.compile({
      optimizer: tf.train.sgd(LEARNING_RATE),
      loss: "meanSquaredError",
    });
    // Finally do the training itself.
    let results = await model.fit(
      FEATURE_RESULTS.NORMALIZED_VALUES,
      OUTPUTS_TENSOR,
      {
        validationSplit: 0.15, // Take aside 15% of the data to use for validation testing.
        shuffle: true, // Ensure data is shuffled in case it was in an order
        batchSize: 64, // As we have a lot of training data, batch size is set to 64.
        epochs: 10, // Go over the data 10 times!
      }
    );

    OUTPUTS_TENSOR.dispose();
    FEATURE_RESULTS.NORMALIZED_VALUES.dispose();
    console.log(
      "Average error loss: " +
        Math.sqrt(results.history.loss[results.history.loss.length - 1])
    );
    console.log(
      "Average validation error loss: " +
        Math.sqrt(results.history.val_loss[results.history.val_loss.length - 1])
    );

    evaluate(); // Once trained evaluate the model.
  }

  train();

  const predict = () => {
    console.log(values);
  };

  return (
    <ContainerComponent>
      <Grid>
        <Paper sx={{ padding: 2 }}>
          <Box>
            <h3>Estimate the Price of the House</h3>
          </Box>
          <Box>
            <p>
              This model is using the Real Estate dataset to estimate the price
              of the house, based in the size (sqf) and the amount of bedrooms.
            </p>
          </Box>
          <Box>
            <strong>** Pending to finish the react implementation</strong>
          </Box>
          <Box>
            <label>Home Size (sqf): </label>{" "}
            <Input
              type="number"
              placeholder="Property Size"
              readOnly={true}
              onChange={(e) => {
                setValues({ ...values, size: e.target.value });
              }}
            ></Input>
          </Box>
          <Box>
            <label>Bedrooms: </label>{" "}
            <Input
              type="number"
              readOnly={true}
              placeholder="# Beds"
              onChange={(e) => {
                setValues({ ...values, bed: e.target.value });
              }}
            ></Input>
          </Box>
          <Box className="mt-2">
            <Button
              onClick={() => {
                predict();
              }}
              variant="contained"
            >
              Estimate
            </Button>
          </Box>
        </Paper>
      </Grid>
    </ContainerComponent>
  );
};

export default Component;
