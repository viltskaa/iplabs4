import './App.css'
import React from "react";

import BaseLayout from "../Components/BaseLayout";
import Students from "../Components/Students";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import StudentAction from "../Components/StudentAction";
import Groups from "../Components/Groups";
import GroupAction from "../Components/GroupAction";
import Disciplines from "../Components/Disciplines";
import DisciplineAction from "../Components/DisciplineAction";
import Report from "../Components/Report";

const router = createBrowserRouter([
    {
        path : "/",
        element : <BaseLayout/>,
        children : [
            {
                path: "students",
                element: <Students/>,
            },
            {
                path : "students/add",
                element: <StudentAction/>
            },
            {
                path : "students/edit",
                element: <StudentAction/>
            },
            {
                path : "groups",
                element : <Groups/>
            },
            {
                path : "groups/add",
                element: <GroupAction/>
            },
            {
                path : "groups/edit",
                element: <GroupAction/>
            },
            {
                path : "disciplines",
                element : <Disciplines/>
            },
            {
                path : "disciplines/add",
                element: <DisciplineAction/>
            },
            {
                path : "disciplines/edit",
                element: <DisciplineAction/>
            },
            {
                path : "disciplines/report",
                element: <Report/>
            }
        ],
    },
]);

const App : React.FC = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
