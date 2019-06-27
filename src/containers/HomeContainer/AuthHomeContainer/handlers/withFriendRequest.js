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
      this.getFriendRequests();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    getFriendRequests = async () => {
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
        let friends = this.state.friends;
        const res = await request({
          url: `/friendships/${id}`,
          method: "PUT",
          data: {
            status: "linked"
          }
        });
        friends = friends
          .map(friend => {
            if (friend._id === id) {
              return null;
            } else return friend;
          })
          .filter(item => item !== null);
        this.setMountedState({ friends });
        this.props.getFriendList();
      } catch (error) {}
    };

    deleteRequest = id => async () => {
      await this.setLoadingItem(id);
      try {
        const res = await request({
          url: `/friendships/${id}`,
          method: "DELETE"
        });
        let friends = this.state.friends;
        friends = friends
          .map(friend => {
            if (friend._id === id) {
              return null;
            } else return friend;
          })
          .filter(item => item !== null);
        this.setMountedState({ friends });
      } catch (error) {
        console.log("err", error);
      }
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
