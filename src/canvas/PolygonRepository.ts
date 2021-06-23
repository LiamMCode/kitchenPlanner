import Polygon from './Polygon';
import { UnitSize } from './PolygonFactory';

export default class PolygonRepository {
    private polygons: Polygon[] = [];

    private polygonFillColours: string[] = [];

    private polygonBorderColours: string[] = [];

    private unitsCreated: UnitSize[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public findFillColours(): string[] {
        return this.polygonFillColours;
    }

    public findBorderColours(): string[] {
        return this.polygonBorderColours;
    }

    public findUnitsCreated(): UnitSize[] {
        return this.unitsCreated;
    }

    public push(
        polygon: Polygon,
        fillColour: string,
        borderColour: string,
        unit: UnitSize
    ): void {
        this.polygons.push(polygon);
        this.polygonFillColours.push(fillColour);
        this.polygonBorderColours.push(borderColour);
        this.unitsCreated.push(unit);
    }

    public deletePolygon(polygonMoved: Polygon): void {
        const movedIndex = this.polygons.indexOf(polygonMoved);
        this.polygons.splice(movedIndex, 1);
        this.polygonFillColours.splice(movedIndex, 1);
        this.polygonBorderColours.splice(movedIndex, 1);
        this.unitsCreated.splice(movedIndex, 1);
    }
}
