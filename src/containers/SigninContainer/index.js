import SigninPage from "./components/Signin";
import withSigninHandler from "./handlers/withSignin";
// css
import "./Signin.css";

export default withSigninHandler(SigninPage);
