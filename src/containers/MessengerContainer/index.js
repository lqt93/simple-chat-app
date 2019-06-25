import Messenger from "./components/Messenger";
import withMessengerHandler from "./handlers/withMessenger";
// css
import "./Messenger.css";

export default withMessengerHandler(Messenger);
