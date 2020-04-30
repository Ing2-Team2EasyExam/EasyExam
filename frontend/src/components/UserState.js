import React from 'react';
import { locales } from "../utils/localization";
import { get } from "../utils/api";
import LoginModal from "./LoginModal";
import { images } from "../utils/images";

const initialState = {
  username: null,
  localeKey: 'english',
  token: null,
  userPk: null,
  credits: null,
  email: null,
  isLoginModalVisible: false,
  isLoginRequired: false,
  profileImage: null,
};

const UserContext = React.createContext();

export default class UserState extends React.Component {
  state = initialState;

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token != null) {
      await this.onLogin({ username: 'loading', token });
    }
  }

  onLogin = async ({ username, token }) => {
    this.setState({
      username,
      token,
      userPk: 'loading',
      credits: 'loading',
      email: 'loading',
      isLoginRequired: false,
      isLoginModalVisible: false,
      profileImage: images.bird,
    });
    localStorage.setItem('token', token);
    const { pk, email, credits, username: u } =
      await get('users/me/', { token });
    this.setState({ userPk: pk, email, credits, username: u });
  };

  onRefreshCredits = async () => {
    const { token } = this.state;
    const { pk, email, credits } =
      await get('users/me/', { token });
    this.setState({ userPk: pk, email, credits });
  };

  onLogout = () => {
    this.setState({
      username: null,
      token: null,
      isLoginModalVisible: false,
    });
    localStorage.removeItem('token');
  };

  onPressLogin = () => {
    this.setState({ isLoginModalVisible: true });
  };

  onRequireLogin = () => {
    this.setState({
      isLoginModalVisible: true,
      isLoginRequired: true
    });
  };

  onHideLogin = () => {
    this.setState({ isLoginModalVisible: false, });
  };

  onChangeLocale = localeKey => {
    this.setState({ localeKey, locale: locales[localeKey] });
  };

  render() {
    const { localeKey } = this.state;
    const { children } = this.props;

    const methods = {
      onChangeLocale: this.onChangeLocale,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
      onPressLogin: this.onPressLogin,
      onHideLogin: this.onHideLogin,
      onRequireLogin: this.onRequireLogin,
      onRefreshCredits: this.onRefreshCredits,
    };
    const context = {
      ...this.state, ...methods,
      locale: locales[localeKey],
    };

    return <UserContext.Provider value={context}>
      {children}
      <LoginModal/>
    </UserContext.Provider>;
  }
}

export function withUserContext(Component) {
  return class extends React.PureComponent {
    render() {
      return <UserContext.Consumer>
        {value => <Component {...this.props} {...value}/>}
      </UserContext.Consumer>;
    }
  };
}
