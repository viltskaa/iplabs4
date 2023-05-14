export type IdName = {
    id : number,
    name : string
}
export type StudentObject = {
    id : number,
    name : string,
    group : IdName | null
}
export type DisciplineObject = {
    id:number,
    name:string,
    groups:Array<IdName>
}
export type GroupObject = {
    id : number,
    name : string,
    students : Array<IdName>,
    disciplines : Array<IdName>
}
export type ReportType = Array<{ first : string, second : number }>
export interface IStudentProps {
    student : StudentObject
}
export interface IGroupProps {
    group : GroupObject
}
export interface IDisciplineProps {
    discipline : DisciplineObject
}