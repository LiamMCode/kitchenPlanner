import * as React from 'react';
import { Matrix } from '../src/canvas/Matrix';
import { Vector } from '../src/canvas/Vector';
import { UnitSize } from '../src/canvas/PolygonFactory';
import { getUnit, UNIT_CATEGORIES } from '../src/canvas/UnitsMap';
import {
    polygonLayerPainter,
    polygonFactory,
    polygonRepository,
} from '../index';

interface hoveredState {
    isHovered: boolean;
}

interface UnitListBoxProps {
    title: string;
}

export class NavBarDropDown extends React.Component<
    UnitListBoxProps,
    hoveredState
> {
    public state: hoveredState;

    constructor(props: UnitListBoxProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public updateState = (): void => {
        this.setState((state) => ({
            isHovered: !state.isHovered,
        }));
    };

    private spawnUnit = (selectedUnitSize: string): void => {
        const unit = selectedUnitSize as UnitSize;
        polygonLayerPainter.setUnit(unit);

        const polygon = polygonFactory
            .createRectangle(getUnit(unit))
            .transform(Matrix.rotateXZ(0))
            .translate(new Vector(1500, 0, 250));

        polygonRepository.push(polygon, getUnit(unit), unit);
    };

    private getItemList(unitType: string): string[] {
        return UNIT_CATEGORIES.get(unitType);
    }

    public render(): React.ReactNode {
        const listItems = this.getItemList(this.props.title);
        return (
            <div>
                <div className='dropdown' onMouseEnter={this.updateState}>
                    {this.props.title} ▼
                </div>
                {this.state.isHovered && (
                    <div
                        className='dropdown-content'
                        onMouseLeave={this.updateState}
                    >
                        <ul>
                            {listItems.map((listItem) => {
                                return (
                                    <li
                                        className='nav-link'
                                        key={listItem}
                                        onClick={() => this.spawnUnit(listItem)}
                                    >
                                        {listItem.charAt(listItem.length - 1)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
