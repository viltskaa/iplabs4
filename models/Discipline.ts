import {DisciplineObject, IdName} from "../types/types";

export default class Discipline {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _groups: Array<IdName>;
    constructor({id, name, groups} : DisciplineObject) {
        this._id = id;
        this._name = name;
        this._groups = groups;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get groups(): Array<IdName> {
        return this._groups;
    }
}