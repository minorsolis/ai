import React from "react";
import Sidebar from "../inc/Sidebar";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import Last from "../inc/Last";
import Sketch from "react-p5";

let x = 50;
let y = 50;
const c_w = 400;
const c_h = 400;
let canvas;

const Component = () => {
  const [xs, setXs] = React.useState([]);
  const [ys, setYs] = React.useState([]);
  const [p5State, setP5] = React.useState({});
  let x_pos = [];
  let y_pos = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(c_w, c_h).parent(canvasParentRef);
  };

  const draw = (p5) => {
    if (p5) {
      setP5(p5);
      p5.background(0);
      p5.stroke(255);
      p5.strokeWeight(8);
      p5.point(30, 30);
      //   console.log("do");
      if (p5) {
        // p5.mousePressed((event) => {
        //   let x = p5.map(p5.mouseX, 0, c_w, 0, 1);
        //   let y = p5.map(p5.mouseY, 0, c_h, 1, 0);
        //   console.log("click");
        //   x_pos.push(x);
        //   y_pos.push(y);
        // });
        // console.log("x_pos", x_pos);
        // for (let i = 0; i < x_pos.length; i++) {
        //   let px = p5.map(x_pos[i], 0, 1, 0, c_w);
        //   let py = p5.map(x_pos[i], 1, 0, c_h, 0);
        //   console.log(" point here", px, py);
        //   p5.point(px, py);
        // }
      }
    }
  };

  console.log(x_pos);

  //   React.useEffect(() => {
  //   }, [xs]);

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Linear regression</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <h4>Set the canvas</h4>
                      </div>
                      <div className="row no-gutters align-items-center">
                        <Sketch setup={setup} draw={draw} />
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
 HERE
`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Last />
    </div>
  );
};

export default Component;
