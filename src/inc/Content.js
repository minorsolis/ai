import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Last from "./Last";

const Component = (props) => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800"> {props.title}</h1>
              </div>
              <div className="row">{props.content}</div>
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
