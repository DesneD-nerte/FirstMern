import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect } from "react";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";
import SchedulerComponent from "../components/LessonsComponents/SchedulerComponent";
import { loadCurrentLessons } from "../store/currentLessonsReducer";

const Lessons = () => {
    const information = useSelector((state) => ({
        ...state.informationData,
    }));
    const currentLessons = useSelector((state) => state.currentLessonsData);
    const dispatch = useDispatch();

    loadMessages(ruMessages);
    locale(navigator.language);

    // const counter = useRef(0);

    useEffect(() => {
        dispatch(loadCurrentLessons());
    }, []);

    return (
        <div>
            <SchedulerComponent
                information={information}
                currentLessons={currentLessons}
                // counter={counter}
            ></SchedulerComponent>
        </div>
    );
};

export default Lessons;
