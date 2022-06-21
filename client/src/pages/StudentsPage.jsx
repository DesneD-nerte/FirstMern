import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";

const Students = () => {
    const [totalPages, setTotalPages] = useState(10);

    // useEffect( async () => {
    //     const response = await axios.get("http://localhost:5000/api/users/students", {
    //         params: {

    //         }
    //     })
    // }, [])

    return (
        <div>
            <h1>Страница со студентами</h1>
            <Pagination
                style={{ paddingTop: 15 }}
                count={totalPages}
                onChange={(e) => console.log(123)}
                color="primary"
                size="large"
            ></Pagination>
        </div>
    );
};

export default Students;
