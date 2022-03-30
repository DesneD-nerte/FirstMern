import MenuComponent from "../components/MenuComponent";
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/tokenContext";
import $api from "../http";
import { loadMessages, locale } from "devextreme/localization";

 const classRooms = [{
    text: '451',
    id: 1,
    color: '#cc5c53',
  }, {
    text: '453',
    id: 2,
    color: '#ff9747',
  }];

const currentDate = new Date();
const Lessons = () => {

    const {isAuth, setIsAuth} = useContext(TokenContext);

    loadMessages(ruMessages);
    locale(navigator.language);

    const onAppointmentFormOpeningAction = (e) => {
        const form = e.form;
        let mainGroupitems = form.itemOption('mainGroup').items;
        form.itemOption("mainGroupitems.allDay", "visible", false);
        //form.itemOption("mainGroupitems.repeat", "visible", false);
    }

    const [allowActions, setAllowActions] = useState({
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true,
        allowResizing: true,
        allowDragging: true,
    })

	const [lessons, setLessons] = useState([{
		text: 'Staff Productivity Report',
		startDate: new Date('2021-05-28T23:15:00.000Z'),
		endDate: new Date('2021-05-29T02:30:00.000Z'),
		teacherId: "61fe65bca9952e94f6a9321b",
		classRoomId: 1,
	}])

	const [teachers, setTeachers] = useState([{
		text: 'Тарасов Евгений Борисович',
		id: "61fe65bca9952e94f6a9321b",
		email: "teacheruser@gmail.com"
	}])

	useEffect(() => {
		$api.get(`http://localhost:5000/api/lessons/`)
        .then(response => {
            setLessons(...response.data);
            console.log(lessons);
        })
        .catch(error => {
            alert(error.response.data.message);
            setIsAuth(false);
        })
	}, [])

    const views = ['agenda', 'month', 'week', 'day'];

     return(
        <div>
            <MenuComponent></MenuComponent>
            <Scheduler
                dataSource={lessons}
                defaultCurrentView="agenda"
                defaultCurrentDate={currentDate}
				// onCellClick={e=> }
                // timeCellTemplate={e =>new Date(e.date).toLocaleString("en-GB", {hour: "2-digit", minute: "2-digit"})}
                onAppointmentFormOpening={onAppointmentFormOpeningAction}
                views={views}
                startDayHour={8}
                endDayHour={22}
                editing={allowActions}
                >
                <Resource
                    dataSource={teachers}
                    allowMultiple={true}
                    fieldExpr="teacherId"
                    label="Преподаватель"
                    useColorAsDefault={true}>
                </Resource>
                <Resource
                    dataSource={classRooms}
                    fieldExpr="classRoomId"
                    label="Аудитория">
                </Resource>
            </Scheduler>
        </div>
    );
};

export default Lessons;