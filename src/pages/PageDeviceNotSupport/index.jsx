import React, { Fragment } from "react";

import WarningDevice from "../../assets/icons/warning.svg";

const PageDeviceNotSupported = () => {
  return (
    <Fragment>
      <div className="page-not-found">
        <div className="container">
          <div className="col-12 d-flex justify-content-center mt-5">
            <div>
              <img src={WarningDevice} alt=""></img>
              <div className="d-flex justify-content-center">
                <p className="fs-2 text-warning mt-3">Device Is Unsupported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageDeviceNotSupported;
