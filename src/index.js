import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Tensor2d from "./ts/Tensor2d";
// import LinearR from "./ts/LinearR";
// import reportWebVitals from "./reportWebVitals";
// import Npl from "./ts/Npl";
import Object from "./ts/Object";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      {/* <Route exact path="/ai/linear" element={<LinearR />} />
      <Route exact path="/ai/npl" element={<Npl />} /> */}
      <Route exact path="/ai/object" element={<Object />} />
      <Route exact path="/ai/tensor2d" element={<Tensor2d />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
