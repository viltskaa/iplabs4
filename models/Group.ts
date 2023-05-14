import {GroupObject, IdName} from "../types/types";

export default class Group {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _students: Array<IdName>;
    private readonly _disciplines: Array<IdName>;

    constructor({id, name, students, disciplines} : GroupObject) {
        this._id = id;
        this._name = name;
        this._disciplines = disciplines;
        this._students = students;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get students(): Array<IdName> {
        return this._students;
    }

    get disciplines(): Array<IdName> {
        return this._disciplines;
    }
}