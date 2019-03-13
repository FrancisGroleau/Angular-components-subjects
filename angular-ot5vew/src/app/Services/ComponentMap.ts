import { ComponentMapItem } from "./ComponentMapItem";
import { Comp1Component } from "../Components/comp1.component";
import { Comp2Component } from "../Components/comp2.component";
import { Comp3Component } from "../Components/comp3.component";

export namespace ComponentMap {
    export const Map: ComponentMapItem[] = [
        new ComponentMapItem('Comp1Component', Comp1Component),
        new ComponentMapItem('Comp2Component', Comp2Component),
        new ComponentMapItem('Comp3Component', Comp3Component),  
    ];
}