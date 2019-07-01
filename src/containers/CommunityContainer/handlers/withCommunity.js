import React from "react";

const withCommunityHandler = CommunityPage =>
  class CommunityHandler extends React.PureComponent {
    state = {};
    componentDidMount() {}
    render() {
      return <CommunityPage {...this.props} {...this.state} />;
    }
  };

export default withCommunityHandler;
