import { Camera } from './Camera';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { PolygonFactory } from './PolygonFactory';
import { PolygonRepository } from './PolygonRepository';
import { getUnit } from './UnitsMap';
import { Vector } from './Vector';

let polygon: Polygon;
const deleteUnit = document.getElementById('deleteUnit');

function onMouseDown(position: Point, polygonRepository: PolygonRepository): void {
    const polygonsCreated = polygonRepository.findAll();
    console.log(polygonsCreated);
    // if mouse position is within any polygon position
    for (let i = 0; i < polygonsCreated.length; i++) {
        const polygonPOSITION = polygonsCreated[i].getPoints();
        const x1 = polygonPOSITION[0].getX();
        const z1 = polygonPOSITION[0].getZ();
        const x2 = polygonPOSITION[2].getX();
        const z2 = polygonPOSITION[2].getZ();
        console.log(x1, x2, z1, z2);

        console.log(polygonPOSITION, position);

        if (
            position.getX() >= x1
            && position.getX() <= x2
            && position.getZ() <= z1
            && position.getZ() >= z2
        ) {
            polygon = new Polygon(polygonPOSITION);
            polygon.isMoving = true;
            polygon.polygonInBounds = polygonsCreated[i];
            console.log('1', polygon);
        }
    }
}

function onMouseMove(
    position: Point,
    polygonRepository: PolygonRepository,
    polygonFactory: PolygonFactory,
): void {
    if (!polygon) {
        return;
    }
    if (polygon.isMoving === true) {
        const polygonUnit = polygonRepository.findUnitByPolygon(polygon.polygonInBounds);

        deleteUnit.addEventListener('click', () => {
            // remove unit from polygon repo + fill & border colour repos
            // if not clicked inside polygon use an alert to ask use to select a polygon
            // NOTE keyboard shortcuts such as DELETE and fn backspace should also work
            // - PGDT-440
        });

        // recreate the polygon in its new location
        const { fillColour, borderColour, dimensions } = getUnit(polygonUnit);

        const polygonMoved = polygonFactory
            .createRectangle(dimensions, polygonUnit)
            .translate(
                new Vector(
                    position.getX() - dimensions.getWidth(dimensions) / 2,
                    dimensions.getHeight(dimensions),
                    position.getZ() - dimensions.getDepth(dimensions) / 2,
                ),
            );

        polygonRepository.push(polygonMoved, fillColour, borderColour, polygonUnit);

        polygonRepository.deletePolygon(polygon.polygonInBounds);
        polygon.polygonInBounds = polygonMoved;
    }
}

function onMouseUp(): void {
    polygon.isMoving = false;
}

export class MouseEventRouter {
    constructor(private camera: Camera) {}

    public register(
        target: EventTarget,
        polygonRepository: PolygonRepository,
        polygonFactory: PolygonFactory,
    ): void {
        target.addEventListener('mousedown', (event: MouseEvent) => {
            onMouseDown(this.camera.findMouseEvent(event), polygonRepository);
        });

        target.addEventListener('mousemove', (event: MouseEvent) => {
            onMouseMove(this.camera.findMouseEvent(event), polygonRepository, polygonFactory);
        });

        target.addEventListener('mouseup', () => {
            onMouseUp();
        });
    }
}
