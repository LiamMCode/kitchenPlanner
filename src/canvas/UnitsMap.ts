import { UnitSize } from "./PolygonFactory";
import { UnitMapping } from "./UnitUtils";

export const WIDGET_MAP: UnitMapping = {
    [UnitSize.A]: {
        borderColour: '#72757B', 
        fillColour: '#E5EBF7', 
        height: 720,
        width: 600, 
        depth: 400,
        unitID: 3762, 
    },
    [UnitSize.B]: {
        borderColour: '#72757B', 
        fillColour: '#E5EBF7', 
        height: 720,
        width: 600, 
        depth: 330,
        unitID: 3568, 
    },
    [UnitSize.C]: {
        borderColour: '#72757B', 
        fillColour: '#FFFEE7', 
        height: 720,
        width: 600, 
        depth: 620,
        unitID: 10810, 
    },
    [UnitSize.D]: {
        borderColour: '#72757B', 
        fillColour: '#FFFEE7', 
        height: 720,
        width: 650, 
        depth: 450,
        unitID: 8874, 
    },
}