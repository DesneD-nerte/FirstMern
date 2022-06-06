import MenuComponent from "../components/MenuComponent";
import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect, useState, useContext } from "react";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';
import axios from "axios";
import { changeInformationData } from "../store/informationReducer";
import SchedulerComponent from '../components/LessonsComponents/SchedulerComponent';
import DataService from "../services/DataService";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const Lessons = () => {

	const information = useSelector((state) => ({...state.informationData}));
    const dispatch = useDispatch();

    loadMessages(ruMessages);
    locale(navigator.language);

	const [currentLessons, setCurrentLessons] = useState();//[]
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        
        DataService.GetMainInformation()
        .then(newInformation => {
            console.log(newInformation);
            dispatch(changeInformationData(newInformation));
        })

        DataService.GetCurrentLessons()
        .then(newCurrentLessons => {
            console.log(newCurrentLessons);
            setCurrentLessons(newCurrentLessons);
        })

        isLoading = false;
        
    }, [isLoading])

    return(
        <div>
            <MenuComponent></MenuComponent>
            {
                currentLessons !== undefined && information !== undefined
                ?
                <SchedulerComponent information={information} currentLessons={currentLessons} setIsLoading={setIsLoading}></SchedulerComponent>
                :
                <div className='loadingProfile'>
                    <CircularProgress size={100}></CircularProgress>
                </div>
            }
        </div>
    );
};

export default Lessons;