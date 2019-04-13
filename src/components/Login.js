import React from 'react';

class LoginPage extends React.Component {
    componentDidMount() {
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, sjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://sdk.snapkit.com/js/v1/login.js";
            sjs.parentNode.insertBefore(js, sjs);
        }(document, 'script', 'loginkit-sdk'));

        window.snapKitInit = function () {
            var loginButtonIconId = 'login-button-target';
            // Mount Login Button
            snap.loginkit.mountButton(loginButtonIconId, {
              clientId: '2fc5fe99-32c8-494c-b1f8-612b96613983',
              redirectURI: '/',
              scopeList: [
                'user.display_name',
                'user.bitmoji.avatar',
              ],
              handleResponseCallback: function() {
                snap.loginkit.fetchUserInfo()
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