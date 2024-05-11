import React from "react";
import Header from "./Header"; 
import CompanyLeft from "./CompanyLeft";

const CompanyLeftHOC = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <CompanyLeft />
          <WrappedComponent {...this.props} /> 
        </div>
      );
    }
  };
};

export default CompanyLeftHOC;
