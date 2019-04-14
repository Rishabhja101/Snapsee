import React from 'react';
import Request from 'superagent';

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNewUser: true,
            users: null,
            snap_username: '',
            personal_photo: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.postFormOnSubmit = this.postFormOnSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
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

    postFormOnSubmit(event){
        event.preventDefault();

        console.log(this.props.data.data.me.displayName);
        console.log(this.props.data.data.me.bitmoji.avatar);
        console.log(this.state.snap_username);
        console.log(this.state.personal_photo);
        
        event.target.reset();
        //make api post request for:
        //display name this.props.data.data.me.displayName
        //bitmoji_url this.props.data.data.me.bitmoji.avatar
        //username this.state.snapchat_username
        //photo this.state.personal_photo
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleImageChange(event){
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    }

    render(){
        if(this.state.isNewUser){ //NEW USER PAGE
            return (
                <div className="text-center">
                    <h2 className="display-4">Welcome to Snapsee <span style={{color: 'yellow'}}>{this.props.data.data.me.displayName}</span></h2>
                    <img className="mb-4" src={this.props.data.data.me.bitmoji.avatar} alt="bitmoji of user"/>

                    <p className="lead">It looks like you are new to Snapsee</p>
                    <form action="/user/add" method="post" className="form-group" onSubmit={this.postFormOnSubmit}>
                        <label style={{color: "yellow"}} htmlFor="snap-username" className="lead">
                            What is your snapchat username?
                        </label><br/>
                        <input required onChange={this.handleChange} type="text" id="snap-username" name="snap_username" className="form-control mb-4" style={{width: "80%", display: "block", margin: "0 auto"}}/>

                        <label style={{color: "yellow"}} htmlFor="image-upload" className="lead">
                            Upload an image your face
                        </label><br/>
                        <input required onChange={this.handleImageChange} type="file" accept="image/*" id="image-upload" name="personal_photo"/>
                        <button type="submit" value="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <h2 className="display-4">Welcome back to Snapsee <span style={{color: 'yellow'}}>{this.props.data.data.me.displayName}</span></h2>
                    <img className="mb-4" src={this.props.data.data.me.bitmoji.avatar} alt="bitmoji of user"/>
        
                    <form action="/" method="get">
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