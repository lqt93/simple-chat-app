import React from "react";
import request from "../../../../utils/request";
import { debounce } from "throttle-debounce";

const INITIAL_STATE = {
  friends: []
};

const withFriendFinderHandler = FriendFinder =>
  class FriendFinderHandler extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
      this.delayedCallback = debounce(1000, this.ajaxCall);
    }

    ajaxCall = event => {
      const keyword = event.target.value.trim();
      this.setState({ keyword });
      this.searchFriends(keyword);
    };

    onChange = event => {
      //This will ensure that the event is not pooled
      event.persist();
      this.delayedCallback(event);
    };

    searchFriends = async keyword => {
      if (!keyword || keyword.length < 3) return;
      const query = encodeURI(`?keyword=${keyword}`);
      try {
        const res = await request({
          url: `/users${query}`,
          method: "GET"
        });

        const friends = res.data.value;

        this.setState({ friends });
      } catch (error) {
        console.log("query error", error);
      }
    };

    sendRequest = (id, status) => async () => {
      const { friends } = this.state;

      friends.map(friend => {
        if (friend._id === id) {
          friend.isLoading = true;
        }
        return friend;
      });

      await this.setState({
        friends
      });

      const promises = friends.map(async friend => {
        if (friend._id === id) {
          try {
            if (status === "waiting") {
              const res = await request({
                url: "/friendships",
                method: "POST",
                data: {
                  friendId: friend._id,
                  status: status
                }
              });
            } else {
              const res = await request({
                url: `/friendships/${friend.friendship}`,
                method: "DELETE"
              });
            }
            friend.isRequested = status === "waiting";
            friend.isLoading = false;
          } catch (error) {}
        }
        return friend;
      });

      const result = await Promise.all(promises);

      console.log("result", result);
      this.setState({
        friends: result
      });
    };

    onSubmit = e => {
      e.preventDefault();
      this.searchFriends(this.state.keyword);
    };

    render() {
      return (
        <FriendFinder
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          sendRequest={this.sendRequest}
          {...this.state}
        />
      );
    }
  };

export default withFriendFinderHandler;
