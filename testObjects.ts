import {GroupObject, StudentObject} from "./types/types";

export const studentsTest : Array<StudentObject> = [
	{
		"id" : 1,
		"name" : "Bazunov Andrew Igorevich",
		"groupName" : "PIbd-22"
	},
	{
		"id" : 2,
		"name" : "Bazunov Andrew Andreevich",
		"groupName" : "PIbd-22"
	},
	{
		"id" : 3,
		"name" : "Bazunov Andrew Andreevich",
		"groupName" : "PIbd-21"
	}
]

export const groupsTest : Array<GroupObject> = [
	{
		id : 1,
		name : "PIbd-22",
		students : [
			{
				"id" : 1,
				"name" : "Bazunov Andrew Igorevich",
				"groupName" : "PIbd-22"
			},
			{
				"id" : 2,
				"name" : "Bazunov Andrew Andreevich",
				"groupName" : "PIbd-22"
			},
			{
				"id" : 3,
				"name" : "Bazunov Andrew Andreevich",
				"groupName" : "PIbd-21"
			}
		]
	},
]