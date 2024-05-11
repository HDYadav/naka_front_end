import React from "react";
import Header from "./Header";
import Leftmenu from "./Leftmenu";
import Footer from "./Footer";

const LayoutHOC = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <div>
            <Leftmenu />
            <WrappedComponent {...this.props} />
          </div>           
        </div>
      );
    }
  };
};

export default LayoutHOC;
