import React from "react";

const withFriendHandler = FriendPage =>
  class FriendHandler extends React.PureComponent {
    state = {};
    componentDidMount() {}
    render() {
      return <FriendPage {...this.props} {...this.state} />;
    }
  };

export default withFriendHandler;
