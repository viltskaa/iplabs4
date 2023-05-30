import axios from "axios";
import {localhost} from "../settings";
import {DisciplineObject, GroupObject, IdName, ReportType, StudentObject} from "../types/types";

export const getJwtToken = () => sessionStorage.getItem("jwt") ?? "";

export const removeJwtToken = () => sessionStorage.removeItem("jwt");
export class StudentReq {
    private static _prefix: string = "api/student";

    static async all() {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return [];
        }
    }

    static async get(id : number) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async add(name : string) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(student : { id : number, name : string }) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.patch(localhost + this._prefix +
                `/edit?id=${student.id}&name=${student.name}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null
        }
    }
}

export class GroupReq {
    private static _prefix: string = "api/group"

    static async all() : Promise<Array<GroupObject>> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return [];
        }
    }

    static async add(name : string) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async get(id : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async addStudent(idGroup : number, idStudent : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix +
                `/addStudent?groupId=${idGroup}&studentId=${idStudent}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(group : IdName) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.patch(localhost
                + this._prefix + `/edit?id=${group.id}&name=${group.name}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null
        }
    }

    static async addDisciplines(group : GroupObject, disciplines : Array<Number>) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix +
                `/addDisciplines?id=${group.id}&disciplinesId=${disciplines.join(',')}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null
        }
    }
}

export class DisciplineReq {
    private static _prefix: string = "api/discipline"

    static async all() : Promise<Array<DisciplineObject>> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return [];
        }
    }

    static async get(id : number) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async add(name : string) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(discipline : IdName) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.patch(localhost + this._prefix +
                `/edit?id=${discipline.id}&name=${discipline.name}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null
        }
    }

    static async report(id : number) : Promise<ReportType | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + `/report?id=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            });
            return data;
        } catch (e) {
            return null
        }
    }
}

export class AuthReq {
    private static _prefix = "jwt/login"

    static async auth(username : string, password : string) {
        try {
            const { data } = await axios.post(localhost + this._prefix, {
                username,
                password
            })
            sessionStorage.setItem("jwt", data);
        } catch (e) {
            return null;
        }
    }

    static async registration(username : string, password : string, passwordConfirm : string) {
        try {
            const { data } = await axios.post(localhost + "jwt/signUp", {
                username,
                password,
                passwordConfirm
            });
        } catch (e) {
            return null;
        }
    }

    static async getUser() {
        try {
            const { data } = await axios.post(localhost + "jwt/user",
                    getJwtToken(), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getJwtToken(),
                }
            })
            console.log(data);
            return data
        } catch (e) {
            return null;
        }
    }
}