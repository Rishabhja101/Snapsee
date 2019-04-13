import React from 'react';

class LoginPage extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://sdk.snapkit.com/js/v1/login.js";
        script.async = true;

        document.body.appendChild(script);

        window.snapKitInit = function () {
            var loginButtonIconId = 'login-button-target';
            // Mount Login Button
            window.snap.loginkit.mountButton(loginButtonIconId, {
              clientId: '2fc5fe99-32c8-494c-b1f8-612b96613983',
              redirectURI: '/',
              scopeList: [
                'user.display_name',
                'user.bitmoji.avatar',
              ],
              handleResponseCallback: function() {
                window.snap.loginkit.fetchUserInfo()
                  .then(data => console.log('User info:', data));
              },
            });
          };
    }

    render() {
        return (
            <div id="login-button-target">
            
            </div>
        );
    }
};

export default LoginPage;