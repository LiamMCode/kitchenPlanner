import { Polygon } from './Polygon';

export class PolygonRepository {
    private polygons: Polygon[] = [];
    private polygonFillColours: string[] = [];
    private polygonBorderColours: string[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public findFillColours(): string[] {
        return this.polygonFillColours;
    }

    public findBorderColours(): string[] {
        return this.polygonBorderColours;
    }

    public push(
        polygon: Polygon,
        fillColour: string,
        borderColour: string
    ): void {
        this.polygons.push(polygon);
        this.polygonFillColours.push(fillColour);
        this.polygonBorderColours.push(borderColour);
    }
}
