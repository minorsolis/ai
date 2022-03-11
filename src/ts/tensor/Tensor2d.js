import React from "react";
import * as tf from "@tensorflow/tfjs";
import ContainerComponent from "../../mui/Container";

const total_tries = 12;

const Component = () => {
  const [losses, setLosses] = React.useState([]);
  const [predictions, setPredictions] = React.useState([]);

  React.useEffect(() => {
    // model
    const model = tf.sequential();

    // layer
    const hidden = tf.layers.dense({
      units: 8,
      inputShape: [2],
      activation: "sigmoid",
    });
    model.add(hidden);

    // output
    const output = tf.layers.dense({
      units: 1,
      activation: "sigmoid",
    });
    model.add(output);

    // options sgd
    const sgdOptions = tf.train.sgd(0.1);

    // compile
    model.compile({
      optimizer: sgdOptions,
      loss: tf.losses.meanSquaredError,
    });

    /**
Data example

[ X1 | X2  ]
0   | 0
0.1 | ?
0.2 | 0.2
0.3 | ?
0.4 | 0.4
0.5 | ?

|   /
|  /
| /
|/_ _ _ _ _ 

*/
    const x1 = tf.tensor2d([
      [0, 0],
      [0.2, 0.2],
      [0.4, 0.4],
    ]);
    const x2 = tf.tensor2d([[0.1], [0.3], [0.5]]);

    const epochFunction = async function epoch() {
      let lossArray = [];
      for (let i = 0; i < total_tries; i++) {
        const result = await model.fit(x1, x2, {
          suffle: true,
          epochs: 50,
        });
        const current_loss = (result.history.loss[0] * 100).toFixed(2);
        lossArray.push(current_loss);
        console.log("current_loss", current_loss, "%");
      }
      setLosses(lossArray);
    };

    epochFunction().then(() => {
      const salid = model.predict(x1);
      console.log("Final response", salid);
      salid.print();
      let predictionsArray = [];
      salid.dataSync().forEach((row) => {
        predictionsArray.push(row);
      });
      setPredictions(predictionsArray);
      model.dispose();
    });
  }, []);

  React.useEffect(() => {
    console.log("losses", losses);
    // GetLooses();
  }, [losses]);

  const GetLooses = () => {
    return (
      <div className="row no-gutters align-items-center">
        {losses &&
          Array.isArray(losses) &&
          losses.map((row, index) => {
            return (
              <div key={index} className="col-sm-12 text-info">
                {row}%
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <ContainerComponent>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">
            Find the linear value in a 2d tensor
          </h1>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-3 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <h4>Find x2 data</h4>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>x1</th>
                          <th>x2</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0.1</td>
                          <td>?</td>
                        </tr>
                        <tr>
                          <td>0.2</td>
                          <td>0.2</td>
                        </tr>
                        <tr>
                          <td>0.3</td>
                          <td>?</td>
                        </tr>
                        <tr>
                          <td>0.4</td>
                          <td>0.4</td>
                        </tr>
                        <tr>
                          <td>0.5</td>
                          <td>?</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <h4>
                    Loss <small>(total tries: {total_tries})</small>{" "}
                  </h4>
                </div>
                <div className="row no-gutters align-items-center">
                  <GetLooses />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <h4>Expected output</h4>
                </div>
                <div className="row no-gutters align-items-center">
                  0.1% <br />
                  0.3% <br />
                  0.5% <br />
                </div>
                <div className="row no-gutters align-items-center">
                  <h4 className="text-primary">Result</h4>
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="text-success" id="result_id" />
                </div>
                <div className="row no-gutters align-items-center">
                  <p>
                    We need at least 500 epochs repetitions to make the loss
                    closest to 0. Using only a few for the example
                  </p>
                  <small>* View page source to understand the code</small>
                </div>
                <div className="row no-gutters align-items-center">
                  {predictions &&
                    Array.isArray(predictions) &&
                    predictions.map((row, index) => {
                      return (
                        <div key={index} className="col-sm-12 text-info">
                          {row.toFixed(2)}%
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <h4>Code</h4>
                </div>
                <div className="row no-gutters align-items-center">
                  <pre>
                    {`
  React.useEffect(() => {
    // model
    const model = tf.sequential();

    // layer
    const hidden = tf.layers.dense({
      units: 4,
      inputShape: [2],
      activation: "sigmoid",
    });
    model.add(hidden);

    // output
    const output = tf.layers.dense({
      units: 1,
      activation: "sigmoid",
    });
    model.add(output);

    // options sgd
    const sgdOptions = tf.train.sgd(0.1);

    // compile
    model.compile({
      optimizer: sgdOptions,
      loss: tf.losses.meanSquaredError,
    });

    /**
Data example

[ X1 | X2  ]
0   | 0
0.1 | ?
0.2 | 0.2
0.3 | ?
0.4 | 0.4
0.5 | ?

|   /
|  /
| /
|/_ _ _ _ _ 

*/
    const x1 = tf.tensor2d([
      [0, 0],
      [0.2, 0.2],
      [0.4, 0.4],
    ]);
    const x2 = tf.tensor2d([[0.1], [0.3], [0.5]]);

    const epochFunction = async function epoch() {
      let lossArray = [];
      for (let i = 0; i < total_tries; i++) {
        const result = await model.fit(x1, x2, { suffle: true, epochs: 100 });
        const current_loss = (result.history.loss[0] * 100).toFixed(2);
        lossArray.push(current_loss);
        console.log("current_loss", current_loss, "%");
      }
      setLosses(lossArray);
    };

    epochFunction().then(() => {
      const salid = model.predict(x1);
      console.log("Final response", salid);
      salid.print();
      let predictionsArray = [];
      salid.dataSync().forEach((row) => {
        predictionsArray.push(row);
      });
      setPredictions(predictionsArray);
    });
  }, []);
`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default Component;
