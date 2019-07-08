import React from "react";

const withHeader = Header =>
  class HeaderHandler extends React.PureComponent {
    state = {
      accountMenu: null,
      isOpenDrawer: false
    };
    handleMenuOpen = anchorEl => e => {
      this.setState({ [anchorEl]: e.currentTarget });
    };
    handleMenuClose = anchorEl => () => {
      this.setState({
        [anchorEl]: null
      });
    };
    handleClickAccountMenuItem = link => () => {
      this.handleMenuClose("accountMenu");
      if (link && link === "signOut") {
        this.props.signOut();
      } else {
        this.props.history.push(link);
      }
    };
    handleClickDrawerItem = link => () => {
      this.setState({ isOpenDrawer: false });
      if (!link) return;
      if (link === "signOut") {
        this.props.signOut();
      } else {
        this.props.history.push(link);
      }
    };
    toggleDrawer = open => () => {
      this.setState({ isOpenDrawer: open });
    };
    render() {
      return (
        <Header
          {...this.state}
          {...this.props}
          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
          handleClickAccountMenuItem={this.handleClickAccountMenuItem}
          handleClickDrawerItem={this.handleClickDrawerItem}
          toggleDrawer={this.toggleDrawer}
        />
      );
    }
  };

export default withHeader;
