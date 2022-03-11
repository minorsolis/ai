import React from "react";
import Plot from "react-plotly.js";
import Content from "../inc/Content";
import { TRAINING_DATA } from "../data/RealEstate";

const Component = () => {
  let bedData = [];
  let sizeData = [];
  let priceData = [];

  function loadData() {
    TRAINING_DATA.inputs.forEach((row) => {
      sizeData.push(row[0]);
      bedData.push(row[1]);
    });
    TRAINING_DATA.outputs.forEach((row) => {
      priceData.push(row);
    });
  }
  loadData();

  return (
    <Content
      title="Dataset review"
      content={
        <div className="col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <h4>Check the Dataset</h4>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-md-12">
                  <h3>Plotly.js</h3>

                  <Plot
                    data={[
                      {
                        x: sizeData,
                        y: priceData,
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "red" },
                      },
                    ]}
                    layout={{
                      title: "Tensoflow Real Estate AI (Size / Price)",
                      description: "HERE",
                    }}
                  />
                  <Plot
                    data={[
                      {
                        x: bedData,
                        y: priceData,
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "red" },
                      },
                    ]}
                    layout={{
                      title: "Tensoflow Real Estate AI (Beds / Price)",
                      description: "HERE",
                    }}
                  />
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
