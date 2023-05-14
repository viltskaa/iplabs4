import {StudentObject} from "../types/types";

export default class Student {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _group: { id : number, name : string } | null;

    constructor({id, name, group} : StudentObject) {
        this._id = id;
        this._name = name;
        this._group = group;
    }

    get group(): { id: number; name: string } | null {
        return this._group;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}