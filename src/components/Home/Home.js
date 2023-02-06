import React from "react";

const Home = ({ setImage }) => {
    return (
        <div>
            <form>
                <input
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
