import React from "react";
import ContainerComponent from "../../mui/Container";
import * as tf from "@tensorflow/tfjs";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
// import { TRAINING_DATA } from "../../data/mnist";

const Component = () => {
  //   const INPUTS = TRAINING_DATA.INPUTS;
  //   const OUTPUTS = TRAINING_DATA.OUTPUTS;
  //   tf.util.shuffleCombo(INPUTS, OUTPUTS);

  //   const INPUTS_TENSOR = tf.tensor2d(INPUTS);
  //   const OUTPUTS_TENSOR = tf.oneHot(tf.tensor1d(OUTPUTS, "int32"), 10);

  //   const model = tf.sequential();
  //   model.add(
  //     tf.layers.dense({ inputShape: [784], units: 32, activation: "relu" })
  //   );
  //   model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  //   model.add(tf.layers.dense({ units: 10, activation: "softmax" }));
  //   model.summary();
  //   train();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ContainerComponent>
      <Grid>
        <Paper sx={{ padding: 2 }}>
          <Box>
            <h3>Handwritting classification</h3>
          </Box>
          <Box>
            I used this based code to estimate a logaritmic function. So instead
            of a line, we are trying to build 3 lines to predict the number.
            <br />
          </Box>
        </Paper>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <h2>Input Image</h2>
            <p>
              Input image is a 28x28 pixel greyscale image from MNIST dataset -
              a real hand drawn digit!
            </p>
            <canvas id="canvas" width="28" height="28"></canvas>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Prediction</h2>
            <p>
              Below you see what number the trained TensorFlow.js model has
              predicted from the input image.
            </p>
            <p>Red is a wrong prediction, Green is a correct one.</p>
            <p id="prediction">Training model. Please wait...</p>
          </Item>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default Component;
