import {DisciplineObject, GroupObject, StudentObject} from "../types/types";
import Student from "../models/Student";
import Group from "../models/Group";
import Discipline from "../models/Discipline";

export const mapStudent = (item : StudentObject) : Student => new Student(item);
export const mapGroup = (item : GroupObject) : Group => new Group(item);
export const mapDiscipline = (item : DisciplineObject) : Discipline => new Discipline(item);