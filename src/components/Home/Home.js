import React from "react";
import "./Home.css";

const Home = ({ setImage }) => {
    return (
        <div>
            <form>
                <label htmlFor='imageSelect'>
                    Select an Image:
                    <img src='/upload.png'></img>
                </label>
                <input
                    name='imageSelect'
                    id='imageSelect'
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}></input>
            </form>
        </div>
    );
};
export default Home;
