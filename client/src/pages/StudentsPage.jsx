import { BottomNavigation, Pagination } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import MenuComponent from "../components/MenuComponent";

const Students = () => {

    const [totalPages, setTotalPages] = useState(10);

    // useEffect( async () => {
    //     const response = await axios.get("http://localhost:5000/api/users/students", {
    //         params: {

    //         }
    //     })
    // }, [])

    return(
        <div>
            <MenuComponent></MenuComponent>
            <h1>
                Страница со студентами
            </h1>
            <Pagination style={{paddingTop: 15}} count={totalPages} onChange={e => console.log(123)} color="primary" size="large"></Pagination>
        </div>
        
    );
};

export default Students;