import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect } from "react";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import SchedulerComponent from "../components/LessonsComponents/SchedulerComponent";
import { loadCurrentLessons } from "../store/currentLessonsReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const Lessons = () => {
    const information = useSelector((state) => ({
        ...state.informationData,
    }));
    const currentLessons = useSelector((state) => state.currentLessonsData);
    const dispatch = useDispatch();

    loadMessages(ruMessages);
    locale(navigator.language);

    useEffect(() => {
        dispatch(loadCurrentLessons());
    }, []);

    return (
        <div>
            <SchedulerComponent
                information={information}
                currentLessons={currentLessons}
            ></SchedulerComponent>
            {/* <div className="loadingProfile">
                    <CircularProgress size={100}></CircularProgress>
                </div> */}
        </div>
    );
};

export default Lessons;
