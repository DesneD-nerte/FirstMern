import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SchedulerComponent from "../components/LessonsComponents/SchedulerComponent";
import { AppDispatch, RootState } from "../store";
import { loadCurrentLessons } from "../store/lessons/currentLessons/currentLessonsThunks";

const Lessons = () => {
    const information = useSelector((state: RootState) => state.informationData);
    const currentLessons = useSelector((state: RootState) => state.currentLessonsData);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadCurrentLessons());
    }, []);

    return (
        <div>
            <SchedulerComponent information={information} currentLessons={currentLessons}></SchedulerComponent>
        </div>
    );
};

export default Lessons;
