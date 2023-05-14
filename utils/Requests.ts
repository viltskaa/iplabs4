import axios from "axios";
import {localhost} from "../settings";
import {DisciplineObject, GroupObject, IdName, ReportType, StudentObject} from "../types/types";
import Group from "../models/Group";

export class StudentReq {
    private static _prefix: string = "student";

    static async all() {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all");
            return data;
        } catch (e) {
            return [];
        }
    }

    static async get(id : number) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async add(name : string) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(student : { id : number, name : string }) : Promise<StudentObject | null> {
        try {
            const {data} = await axios.patch(localhost + this._prefix + `/edit?id=${student.id}&name=${student.name}`);
            return data;
        } catch (e) {
            return null
        }
    }
}

export class GroupReq {
    private static _prefix: string = "group"

    static async all() : Promise<Array<GroupObject>> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all");
            return data;
        } catch (e) {
            return [];
        }
    }

    static async add(name : string) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async get(id : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async addStudent(idGroup : number, idStudent : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix +
                `/addStudent?groupId=${idGroup}&studentId=${idStudent}`);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(group : IdName) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.patch(localhost + this._prefix + `/edit?id=${group.id}&name=${group.name}`);
            return data;
        } catch (e) {
            return null
        }
    }

    static async addDisciplines(group : GroupObject, disciplines : Array<Number>) : Promise<GroupObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix +
                `/addDisciplines?id=${group.id}&disciplinesId=${disciplines.join(',')}`);
            return data;
        } catch (e) {
            return null
        }
    }
}

export class DisciplineReq {
    private static _prefix: string = "discipline"

    static async all() : Promise<Array<DisciplineObject>> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/all");
            return data;
        } catch (e) {
            return [];
        }
    }

    static async get(id : number) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + "/get?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async add(name : string) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.post(localhost + this._prefix + "/add?name=" + name);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async remove(id : number) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.delete(localhost + this._prefix + "/delete?id=" + id);
            return data;
        } catch (e) {
            return null;
        }
    }

    static async edit(discipline : IdName) : Promise<DisciplineObject | null> {
        try {
            const {data} = await axios.patch(localhost + this._prefix + `/edit?id=${discipline.id}&name=${discipline.name}`);
            return data;
        } catch (e) {
            return null
        }
    }

    static async report(id : number) : Promise<ReportType | null> {
        try {
            const {data} = await axios.get(localhost + this._prefix + `/report?id=${id}`);
            return data;
        } catch (e) {
            return null
        }
    }
}