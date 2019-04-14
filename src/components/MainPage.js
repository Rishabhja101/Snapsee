import React from 'react';
import Request from 'superagent';

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNewUser: false,
            users: null
        }
    }

    componentWillMount(){
        //gets all the users
        let url = "/user/get"
        Request.get(url)
        .then((res) => {
            this.setState({
                users: res
            });
        });

        //gets the specific user's info from the api
        url = "/user/get/username"
        Request.get(url)
        .set("bitmoji_url", this.props.data.data.me.bitmoji.avatar)
        .then((res) => {
            //TODO:
            // if response doesn't return anything then set isNewUser = true

            console.log(res);
        })


    }

    render(){
        if(this.state.isNewUser){ //NEW USER PAGE
            return (
                <div className="text-center">
                    <h2 className="display-4">Welcome to Snapsee <span style={{color: 'yellow'}}>{this.props.data.data.me.displayName}</span></h2>
                    <img className="mb-4" src={this.props.data.data.me.bitmoji.avatar} alt="bitmoji of user"/>

                    <p className="lead">It looks like you are new to Snapsee</p>
                    <form action="/user/add" method="post" className="form-group">
                        <label style={{color: "yellow"}} htmlFor="snap-username" className="lead">
                            What is your snapchat username?
                        </label><br/>
                        <input required type="text" id="snap-username" className="form-control mb-4" style={{width: "80%", display: "block", margin: "0 auto"}}/>

                        <label style={{color: "yellow"}} htmlFor="image-upload" className="lead">
                            Upload an image your face
                        </label><br/>
                        <input required type="file" accept="image/*" id="image-upload"/>
                        <button type="submit" value="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <h2 className="display-4">Welcome back to Snapsee <span style={{color: 'yellow'}}>{this.props.data.data.me.displayName}</span></h2>
                    <img className="mb-4" src={this.props.data.data.me.bitmoji.avatar} alt="bitmoji of user"/>
        
                    <form action="/" method="post">
                        <label htmlFor="image-upload" className="lead">
                            Upload an image of desired friends' face
                        </label><br/>
                        <input required type="file" accept="image/*" id="image-upload"/>
                        <button type="submit" value="submit">Upload Image</button>
                    </form>
                </div>
            );   
        }
    }
};

export default MainPage;