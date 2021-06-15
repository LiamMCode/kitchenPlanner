import { Matrix } from 'app/canvas/Matrix';
import { expect } from 'chai';
import { Point } from 'app/canvas/Point';

describe('Matrix', () => {
    describe('#rotateXZ', () => {
        it('should rotate in the XZ plane', () => {
            const point = new Point(1, 1, 1);
            const rotations = [
                { angle: 3 * Math.PI / 2, expected: new Point(1, 1, -1) },
                { angle: Math.PI, expected: new Point(-1, 1, -1) },
                { angle: Math.PI / 2, expected: new Point(-1, 1, 1) },
                { angle: Math.PI / 4, expected: new Point(0, 1, Math.SQRT2) },
                { angle: 0, expected: point },
                { angle: -Math.PI / 4, expected: new Point(Math.SQRT2, 1, 0) },
                { angle: 4 * Math.PI, expected: point },
                { angle: 3 * Math.PI, expected: new Point(-1, 1, -1) }
            ];

            rotations.forEach(({angle, expected}) => {
                const matrix = Matrix.rotateXZ(angle);
                const actual = matrix.applyToPoint(point);

                expect(actual.equals(expected), [actual, expected].toString()).to.be.true;
            });
        });
    })
});
