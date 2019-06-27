import React from "react";
import request from "../../../../utils/request";

const INITIAL_STATE = {
  friends: [],
  isLoading: false
};

const withFriendRequestHandler = FriendRequest =>
  class FriendRequestHandler extends React.PureComponent {
    state = { ...INITIAL_STATE };
    _isMounted = false;

    componentDidMount() {
      this._isMounted = true;
      this.getFriends();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    getFriends = async () => {
      this.setMountedState({ isLoading: true });
      try {
        const res = await request({
          url: "/friendships/requests",
          method: "GET"
        });
        let friends = res.data.value;
        friends = friends.map(item => {
          let newItem = item.friend;
          newItem._id = item._id;
          return newItem;
        });
        this.setMountedState({ friends, isLoading: false });
      } catch (error) {
        this.setMountedState({ isLoading: false });
      }
    };

    accceptFriendRequest = id => async () => {
      await this.setLoadingItem(id);
      try {
        const friends = this.state.friends;
        const promises = friends.map(async friend => {
          if (friend._id === id) {
            const res = await request({
              url: `/friendships/${id}`,
              method: "PUT",
              data: {
                friendId: friend._id,
                status: "linked"
              }
            });
            return null;
          }
          return friend;
        });
        let result = Promise.all(promises);
        result = result.filter(item => item !== null);
        this.setMountedState({ friends: result });
      } catch (error) {}
    };

    deleteRequest = id => async () => {
      await this.setLoadingItem(id);
      try {
        const friends = this.state.friends;
        const promises = friends.map(async friend => {
          if (friend._id === id) {
            const res = await request({
              url: `/friendships/${id}`,
              method: "DELETE"
            });
            return null;
          }
          return friend;
        });
        let result = Promise.all(promises);
        result = result.filter(item => item !== null);
        this.setMountedState({ friends: result });
      } catch (error) {}
    };

    setLoadingItem = async id => {
      const { friends } = this.state;
      friends.map(friend => {
        if (friend._id === id) friend.isLoading = true;
        return friend;
      });
      this.setMountedState(friends);
    };

    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }

    render() {
      return (
        <FriendRequest
          {...this.state}
          accceptFriendRequest={this.accceptFriendRequest}
          deleteRequest={this.deleteRequest}
        />
      );
    }
  };

export default withFriendRequestHandler;
