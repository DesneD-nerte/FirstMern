import React from "react";

const Photos = () => {
    return (
        <div className="photos">
            <div className="photos_column column_1">
                <div className="column-image">
                    <img src={"/login/House.webp"} alt="House" loading="lazy"></img>
                </div>
                <div className="column-image">
                    <img src={"/login/Sea.webp"} alt="Sea" loading="lazy"></img>
                </div>
            </div>
            <div className="photos_column column_2">
                <div className="column-image">
                    <img src={"/login/Lighthouse.webp"} alt="Lighthouse" loading="lazy"></img>
                </div>
                <div className="column-image">
                    <img src={"/login/DarkLandscape.webp"} alt="DarkLandscape" loading="lazy"></img>
                </div>
            </div>
            <div className="photos_column column_3">
                <div className="column-image">
                    <img src={"/login/Triangles.webp"} alt="Triangles" loading="lazy"></img>
                </div>
                <div className="column-image">
                    <img src={"/login/BlueSea.webp"} alt="BlueSea" loading="lazy"></img>
                </div>
            </div>
        </div>
    );
};

export default Photos;
