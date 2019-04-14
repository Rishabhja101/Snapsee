import React from 'react';

class LoginPage extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://sdk.snapkit.com/js/v1/login.js";
        script.async = true;

        document.body.appendChild(script);

        const handleLogin = this.props.handleLogin;
        window.snapKitInit = function () {
            var loginButtonIconId = 'login-button-target';
            // Mount Login Button
            window.snap.loginkit.mountButton(loginButtonIconId, {
              clientId: '2fc5fe99-32c8-494c-b1f8-612b96613983',
              redirectURI: 'http://localhost:3000/login'/*'https://snapsee.net/login'*/,
              scopeList: [
                'user.display_name',
                'user.bitmoji.avatar',
              ],
              handleResponseCallback: function() {
                window.snap.loginkit.fetchUserInfo()
                  .then(data => handleLogin(data));
              },
            });
          };
    }

    render() {
        return (
          <div className="text-center">
            <img src="https://66.media.tumblr.com/1844b1112b107102601a6c300de4e37f/tumblr_ppxs61zEAB1yn6gjno1_540.png" alt="snapsee logo banner" style={{width: "100vw"}} />
            <h2 className="lead my-4">One click snap adding.</h2>
            <div id="login-button-target"/>
          </div>
        );
    }
};

export default LoginPage;