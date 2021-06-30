import * as React from 'react';
import { Matrix } from '../src/canvas/Matrix';
import { Vector } from '../src/canvas/Vector';
import { UnitSize } from '../src/canvas/PolygonFactory';
import { getUnit } from '../src/canvas/UnitsMap';
import {
    polygonLayerPainter,
    polygonFactory,
    polygonRepository,
} from '../index';

interface IState {
    isHovered: boolean;
}

interface UnitListBoxProps {
    listItems: string[];
    title: string;
}

export class NavBarDropDown extends React.Component<UnitListBoxProps, IState> {
    public state: IState;

    constructor(props: UnitListBoxProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public updateState = (): void => {
        this.setState((state) => {
            return {
                isHovered: !state.isHovered,
            };
        });
    };

    private spawnUnit = (selectedUnitSize: string): void => {
        const unit = selectedUnitSize as UnitSize;
        polygonLayerPainter.setUnit(unit);

        const { dimensions, fillColour, borderColour } = getUnit(unit);
        const polygon = polygonFactory
            .createRectangle(dimensions, unit)
            .transform(Matrix.rotateXZ(0))
            .translate(new Vector(1500, 0, 250));

        polygonRepository.push(polygon, fillColour, borderColour, unit);
    };

    public render(): React.ReactNode {
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
                            {this.props.listItems.map((listItem) => {
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
