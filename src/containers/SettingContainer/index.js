import React from "react";
import SettingPage from "../../components/pages/Settings";

class SettingContainer extends React.PureComponent {
  state = {
    currentTab: ""
  };
  componentDidMount() {
    this.setState({
      currentTab: this.getCurrentTab(this.props.location.search)
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        currentTab: this.getCurrentTab(nextProps.location.search)
      });
    }
  }
  getCurrentTab(search = "") {
    switch (true) {
      case search.indexOf("?tab=profile") >= 0:
        return "Profile";
      case search.indexOf("?tab=avatar") >= 0:
        return "Avatar";
      case search.indexOf("?tab=security") >= 0:
        return "Security";
      default:
        return "Profile";
    }
  }
  render() {
    return <SettingPage {...this.state} {...this.props} />;
  }
}

export default SettingContainer;
