import * as React from "react";
import ContainerComponent from "./mui/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Component = () => {
  return (
    <ContainerComponent>
      <Typography paragraph>
        This repository contains multiple examples of AI implemented with
        React.js. <br />
        The examples are from the internet and also from the: Google AI for Web
        Based Machine Learning certificate.
        <br />
        <br />
        For more information please go to:{" "}
        <Button
          variant="outlined"
          href="https://www.tensorflow.org/"
          target="_blank"
          color="warning"
        >
          TensorFlow.js
        </Button>
        <br />
        <br />
        More examples:{" "}
        <ul>
          <li>
            <a href="https://short-wry-caribou.glitch.me/" target="_blank">
              Fashion classifier
            </a>
          </li>
          <li>
            <a href="https://sky-crocus-marjoram.glitch.me/" target="_blank">
              Handwritting number reader
            </a>
          </li>
          <li>
            <a href="https://purrfect-gratis-sulfur.glitch.me/" target="_blank">
              Object detection
            </a>
          </li>
        </ul>
        <br />
        <br />
        Feel free to clone and use then. Have an awesome day! <br />
        <br />
        Minor Solis
      </Typography>
    </ContainerComponent>
  );
};

export default Component;
