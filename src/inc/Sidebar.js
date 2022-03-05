import { Link } from "react-router-dom";

const Component = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/ai/"
      >
        <div className="sidebar-brand-icon">
          <i className="fas fa-robot" />
        </div>
        <div className="sidebar-brand-text mx-3">
          AI <sup>ms</sup>
        </div>
      </Link>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">TensorFlow</div>
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#top"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Demos</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">TensorFlow</h6>
            <Link className="collapse-item" to="/ai/tensor2d">
              2D Tensor
            </Link>
            <Link className="collapse-item" to="/ai/object">
              Object detection
            </Link>
            <Link className="collapse-item" to="/ai/object2">
              Object (static)
            </Link>
          </div>
        </div>
      </li>
      {/* <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div> */}
    </ul>
  );
};
export default Component;
