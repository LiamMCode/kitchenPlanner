import { Polygon } from 'app/canvas/Polygon';

export class PolygonRepository {
    private polygons: Polygon[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public push(polygon: Polygon): void {
        this.polygons.push(polygon);
    }
}
