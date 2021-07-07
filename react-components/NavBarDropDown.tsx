import * as React from 'react';
import { Matrix } from '../src/canvas/Matrix';
import { Vector } from '../src/canvas/Vector';
import { polygonLayerPainter, polygonFactory, polygonRepository } from '../index';
import { WidgetUnitData, unitsRepositoryService } from '../axios/UnitsRepositoryService';

interface hoveredState {
    isHovered: boolean;
    list: Map<string, WidgetUnitData>;
}

interface UnitListBoxProps {
    title: string;
}

export class NavBarDropDown extends React.Component<UnitListBoxProps, hoveredState> {
    public state: hoveredState;

    constructor(props: UnitListBoxProps) {
        super(props);

        this.state = {
            isHovered: false,
            list: new Map(),
        };
    }

    public async componentDidMount() {
        this.setState({
            ...this.state,
            list: await unitsRepositoryService.getList(this.props.title),
        });
    }

    public updateState = (): void => {
        this.setState((state) => ({
            isHovered: !state.isHovered,
        }));
    };

    private spawnUnit = (selectedUnit: string, unitType: string): void => {
        polygonLayerPainter.setUnit(selectedUnit);
        const unitData = unitsRepositoryService.getUnit(selectedUnit, unitType);

        const polygon = polygonFactory
            .createRectangle(unitData)
            .transform(Matrix.rotateXZ(0))
            .translate(new Vector(500, 0, 250));

        polygonRepository.push(polygon, unitsRepositoryService.getUnit(selectedUnit, unitType));
    };

    public render(): React.ReactNode {
        const DataList = Array.from(this.state.list);
        return (
            <div>
                <div className='dropdown' onMouseEnter={this.updateState}>
                    {this.props.title} ▼
                </div>
                {this.state.isHovered && (
                    <div className='dropdown-content' onMouseLeave={this.updateState}>
                        <ul>
                            {DataList.map((listItem) => {
                                const [id, data] = listItem;
                                return (
                                    <li
                                        className='nav-link'
                                        key={id}
                                        onClick={() => this.spawnUnit(data.name, data.type)}
                                    >
                                        {data.name}
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
