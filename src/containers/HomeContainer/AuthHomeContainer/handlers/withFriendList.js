import React from "react";
import request from "../../../../utils/request";

const INITIAL_STATE = {};

const withFriendListHandler = FriendList =>
  class FriendListHandler extends React.PureComponent {
    state = { ...INITIAL_STATE };
    _isMounted = false;

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }

    render() {
      return <FriendList {...this.props} {...this.state} />;
    }
  };

export default withFriendListHandler;
