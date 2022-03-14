import React from "react";
import Plot from "react-plotly.js";
import { TRAINING_DATA } from "../../data/RealEstate";
import ContainerComponent from "../../mui/Container";
import { Link } from "react-router-dom";

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
    <ContainerComponent>
      <div className="col-md-12">
        <h3>Dataset Review</h3>
        <ul>
          <li>
            <Link to="/ai/remodel">Pend. Implementation</Link>
          </li>
        </ul>

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
    </ContainerComponent>
  );
};

export default Component;
