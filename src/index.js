import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Tensor2d from "./ts/tensor/Tensor2d";
import Camera from "./ts/vision/Camera";
import Image from "./ts/vision/Image";
import Toxic from "./ts/language/Toxic";
import Plot from "./ts/realestate/Plot";
import ReModel from "./ts/realestate/ReModel";
import MultiLayer from "./ts/tensor/MultiLayer";
import Classification from "./ts/tensor/Classification";
import BrainStore from "./ts/brainjs/Store";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/ai/plot" element={<Plot />} />
      <Route exact path="/ai/remodel" element={<ReModel />} />
      <Route exact path="/ai/camera" element={<Camera />} />
      <Route exact path="/ai/image" element={<Image />} />
      <Route exact path="/ai/toxic" element={<Toxic />} />
      <Route exact path="/ai/tensor2d" element={<Tensor2d />} />
      <Route exact path="/ai/multilayer" element={<MultiLayer />} />
      <Route exact path="/ai/classification" element={<Classification />} />
      <Route exact path="/ai/brainStore" element={<BrainStore />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
