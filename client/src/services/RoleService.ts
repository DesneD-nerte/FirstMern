import { Role } from "../../types"
import ControlPanel from "../components/NewsComponents/ControlPanel"
import NewsList from "../components/NewsComponents/NewsList"

class RoleService {
    SchedulerSetActions(roles: Array<Role>) {
        if(roles.some(oneRole => oneRole.value === 'UNIVERSITY') ||
            roles.some(oneRole => oneRole.value === 'ADMIN')) {
                return {
                    allowUpdating: true,
                    allowAdding: true,
                    allowResizing: true,
                    allowDeleting: true,
                    allowDragging: true,
                }
        }
        if(roles.some(oneRole => oneRole.value === 'STUDENT') ||
            roles.some(oneRole => oneRole.value === 'TEACHER') ||
            roles.some(oneRole => oneRole.value === 'RAILWAY')) {
                return {
                    allowUpdating: false,
                    allowAdding: false,
                    allowResizing: false,
                    allowDeleting: false,
                    allowDragging: false,
                }
        }

        return {
            allowUpdating: false,
            allowAdding: false,
            allowResizing: false,
            allowDeleting: false,
            allowDragging: false,
        }
    }

    CheckControlRolePanel(roles: Array<Role>) {
        if(roles.some(oneRole => oneRole.value === 'UNIVERSITY') ||
            roles.some(oneRole => oneRole.value === 'ADMIN')) {
                return (
                    true
                )
        }
        if(roles.some(oneRole => oneRole.value === 'STUDENT') ||
            roles.some(oneRole => oneRole.value === 'TEACHER') ||
            roles.some(oneRole => oneRole.value === 'RAILWAY')) {
                return (
                    false
                );
        }

        return false
    }

    CheckJournalRole(roles: Array<Role>) {
        if(roles.some(oneRole => oneRole.value === 'TEACHER') ||
            roles.some(oneRole => oneRole.value === 'ADMIN')) {
                return (
                    true
                )
        }
        if(roles.some(oneRole => oneRole.value === 'STUDENT') ||
            roles.some(oneRole => oneRole.value === 'UNIVERSITY') ||
            roles.some(oneRole => oneRole.value === 'RAILWAY')) {
                return (
                    false
                );
        }

        return false
    }

    CheckAdminRole(roles: Array<Role>) {
        if(roles.some(oneRole => oneRole.value === 'ADMIN')) {
            return true
        }
          
        return false;
    }
}

export default new RoleService();