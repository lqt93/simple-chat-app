import React from "react";
import request from "../../../utils/request";

const INITIAL_STATE = {
  isOpeningRoomNameInput: false
};

const withCurrentRoomHandler = CurrentRoomComponent =>
  class CurrentRoomHandler extends React.PureComponent {
    state = { ...INITIAL_STATE };
    _isMounted = false;
    componentDidMount() {
      this._isMounted = true;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentWillReceiveProps(nextProps) {
      const currentRoomId = this.props.currentRoomId;
      const nextRoomId = nextProps.currentRoomId;
      if (currentRoomId !== nextRoomId) {
      }
    }
    submitNewRoomName = async e => {
      try {
        if (e) e.preventDefault();
        const { currentRoom } = this.props;
        currentRoom.name = this.state.nameInputValue.trim();
        this.props.modifyCurrentRoom(currentRoom);
        this.setMountedState({
          isOpeningRoomNameInput: false
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    handleChangeNameInput = e => {
      e.persist();
      this.setState({
        nameInputValue: e.target.value
      });
    };
    toggleRoomNameInput = () => {
      this.setMountedState({
        isOpeningRoomNameInput: !this.state.isOpeningRoomNameInput
      });
    };
    handleKeyDownSubmitBtn = e => {
      if (e.keyCode === 9) {
        this.toggleRoomNameInput();
      }
    };
    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }
    render() {
      return (
        <CurrentRoomComponent
          {...this.props}
          {...this.state}
          toggleRoomNameInput={this.toggleRoomNameInput}
          submitNewRoomName={this.submitNewRoomName}
          handleKeyDownSubmitBtn={this.handleKeyDownSubmitBtn}
          handleChangeNameInput={this.handleChangeNameInput}
        />
      );
    }
  };

export default withCurrentRoomHandler;
