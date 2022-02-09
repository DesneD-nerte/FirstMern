import MenuComponent from "../components/MenuComponent";
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import { useEffect, useState } from "react";
import $api from "../http";

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
		$api.get(`http://localhost:5000/api/lesson/`)
        .then(response => {
                setLessons(...response.data);
				console.log(lessons);
            })
	}, [])

     return(
        <div>
            <MenuComponent></MenuComponent>
            <Scheduler
                dataSource={lessons}
                defaultCurrentView="agenda"
                defaultCurrentDate={currentDate}
				// onCellClick={e=> }
                // timeCellTemplate={e =>new Date(e.date).toLocaleString("en-GB", {hour: "2-digit", minute: "2-digit"})}

                startDayHour={8}
                endDayHour={22}
                editing={allowActions}
                >
                <View 
                    type="agenda">
                        {/* БАГ С НАЗВАНИЕМ */}
                </View>
                <View
                    type="month"
                    name="Месяц"> 
                </View>
                <View
                    type="week"
                    name="Неделя"> 
                </View>
                <View
                    type="day"
                    name="День"> 
                </View>
                <Resource
                    dataSource={teachers}
                    allowMultiple={true}
                    fieldExpr="teacherId"
                    label="Teacher"
                    useColorAsDefault={true}>
                </Resource>
                <Resource
                    dataSource={classRooms}
                    fieldExpr="classRoomId"
                    label="ClassRoom">
                </Resource>
            </Scheduler>
        </div>
    );
};

export default Lessons;