import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Students from "../../Components/Students";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Students">
                <Students/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;