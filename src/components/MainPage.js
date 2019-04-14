import React from 'react';

const MainPage = (props) => {
    console.log(props.data);
    return (
        <div className="text-center">
            <h2 className="display-4">Welcome to Snapsee <span style={{color: 'yellow'}}>{props.data.data.me.displayName}</span></h2>
            <img className="mb-4" src={props.data.data.me.bitmoji.avatar} alt="bitmoji of user"/>

            <form action="/" method="post">
                <label for="image-upload" className="lead">
                    Upload an image of desired friends' face
                </label><br/>
                <input type="file" accept="image/*" id="image-upload"/>
                <button type="submit" value="submit">Upload Image</button>
            </form>
        </div>
    );
};

export default MainPage;