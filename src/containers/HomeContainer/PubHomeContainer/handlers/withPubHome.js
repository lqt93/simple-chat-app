import React from "react";
const withPubHomeHandler = PubHomePage =>
  class PubHomeHandler extends React.PureComponent {
    render() {
      return <PubHomePage {...this.props} />;
    }
  };

export default withPubHomeHandler;
