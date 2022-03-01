import Sidebar from "./inc/Sidebar";
import Navbar from "./inc/Navbar";
import Footer from "./inc/Footer";
import Last from "./inc/Last";

export default () => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">AI demos</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <h4>Find x2 data</h4>
                      </div>
                      <div className="row no-gutters align-items-center">
                        <p>Check the Demos options in the menu</p>
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
