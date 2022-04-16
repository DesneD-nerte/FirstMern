import { Workbook } from "igniteui-react-excel";
import { User } from "../../types";

export default class ExcelUsers {

    static #dataBaseRoles = {student: 'STUDENT',
        teacher: 'TEACHER',
        university: 'UNIVERSITY',
        admin: 'ADMIN',
        railWay: 'RAILWAY'
    };

    static createArrayUsers (workbook: Workbook) {
        const arrayNewUsers: Array<User> = [];
        const workSheet = workbook.worksheets(0);
        const countRows = workSheet.rows().count;

        for(let i = 1; i < countRows; i++) {
            let newUser: User;
            const row = workSheet.rows(i);
            const roles: String = row.getCellValue(1);
            const rolesArray = roles.toLowerCase().split(/[, ]+/);

            const modifiedRolesArray = rolesArray.map(oneRole => {
                if(oneRole === "студент") {
                    oneRole = this.#dataBaseRoles.student;
                }
                if(oneRole === "преподаватель" || oneRole === "учитель" ) {
                    oneRole = this.#dataBaseRoles.teacher;
                }
                if(oneRole === "деканат") {
                    oneRole = this.#dataBaseRoles.university;
                }
                if(oneRole === "админ" || oneRole === "администратор") {
                    oneRole = this.#dataBaseRoles.admin;
                }
                if(oneRole === "жд" || oneRole === "ржд") {
                    oneRole = this.#dataBaseRoles.railWay;
                }

                return oneRole;
            })

            let facultiesArray: Array<String> = [];
            let groupsArray: Array<String> = [];
            let departmentsArray: Array<String> = [];

            const faculties: String = row.getCellValue(5);
            if(faculties) {
                facultiesArray = (faculties.charAt(0).toUpperCase() + faculties.slice(1)).split(/[, ]+/);//First Letter Upper
            }

            const groups: String = row.getCellValue(6);
            if(groups) {
                groupsArray = groups.toUpperCase().split(/[, ]+/);//All letter Upper
            }

            const departments: String = row.getCellValue(7);
            if(departments) {
                departmentsArray = (departments.charAt(0).toUpperCase() + departments.slice(1)).split(/[,]+/);//First Letter Upper
            }
            newUser = {
                name: row.cells(0).value,
                roles: modifiedRolesArray,
                email: row.cells(2).value,
                username: row.cells(3).value,
                password: row.cells(4).value,
                faculties: facultiesArray,
                groups: groupsArray,
                departments: departmentsArray,
            }
            arrayNewUsers.push(newUser);
        }

        return arrayNewUsers;
    }

    static fillArrayUsers(workbook: Workbook, arrayUsers: Array<User>) {
        const workSheet = workbook.worksheets(0);
        const countRows = workSheet.rows().count;
        const countColumns = 8;
        console.log(arrayUsers);
        for(let i = 0; i < countRows - 1; i++) {//0-5
            const row = workSheet.rows(i + 1);//1,2,3,4,5,6
            console.log(arrayUsers[i]);
            row.setCellValue(3, arrayUsers[i].username);//0,1,2,3,4,5
            row.setCellValue(4, arrayUsers[i].password);
        }

        return workbook;
    }
}