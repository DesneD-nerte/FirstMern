import React from "react";
import "../styles/MyProfile.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { CircularProgress } from "@mui/material";

import PersonalData from "../components/ProfileComponents/PersonalData";
import SettingsPanel from "../components/ProfileComponents/SettingsPanel";
import ListLinks from "../components/ProfileComponents/ListLinks";

export default function MyProfile() {
    const { isLoading } = useSelector((state: RootState) => state.profileData);

    return (
        <div className="wrapperProfile">
            {isLoading ? (
                <div className="loadingProfile">
                    <CircularProgress size={100}></CircularProgress>
                </div>
            ) : (
                <div className="mainBoard">
                    <div className="info">
                        <PersonalData />
                        <SettingsPanel />
                    </div>
                    <ListLinks></ListLinks>
                </div>
            )}
        </div>
    );
}
