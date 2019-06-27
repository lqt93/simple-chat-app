import React from "react";
import request from "../../../../utils/request";

const INITIAL_STATE = {
  publicRooms: [],
  friendList: [],
  loading: false,
  isLoadingFriendList: false,
  error: false
};

const withAuthHomeHandler = AuthHomePage =>
  class AuthHomeHandler extends React.PureComponent {
    state = {
      ...INITIAL_STATE
    };
    _isMounted = false;
    componentDidMount() {
      this._isMounted = true;
      this.getPublicRooms();
      this.getFriendList();
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    async getPublicRooms() {
      this.setMountedState({
        loading: true
      });

      try {
        const res = await request({
          url: "/rooms/public",
          method: "GET"
        });

        if (res.data.status === "success") {
          this.setMountedState({
            publicRooms: res.data.value.rooms,
            loading: false,
            error: false
          });
        } else {
          this.setMountedState({
            loading: false,
            error: res.data.message
          });
        }
      } catch (err) {
        this.setMountedState({
          loading: false,
          error: err
        });
        console.log("err", err);
      }
    }
    getFriendList = async () => {
      this.setMountedState({ isLoadingFriendList: true });
      try {
        const res = await request({
          url: "/friendships/yours",
          method: "GET"
        });
        let friendList = res.data.value;
        friendList = friendList.map(item => {
          let newItem = item.friend;
          newItem._id = item._id;
          return newItem;
        });
        this.setMountedState({ friendList, isLoadingFriendList: false });
      } catch (error) {
        this.setMountedState({ isLoadingFriendList: false });
      }
    };

    removeFriend = id => async () => {
      await this.setLoadingItem(id);
      try {
        const res = await request({
          url: `/friendships/${id}`,
          method: "DELETE"
        });
        this.getFriendList();
      } catch (error) {}
    };

    setLoadingItem = async id => {
      const { friendList } = this.state;
      friendList.map(friend => {
        if (friend._id === id) friend.isLoading = true;
        return friend;
      });
      this.setMountedState({ friendList });
    };

    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }

    render() {
      return (
        <AuthHomePage
          {...this.props}
          {...this.state}
          getFriendList={this.getFriendList}
          removeFriend={this.removeFriend}
        />
      );
    }
  };

export default withAuthHomeHandler;
