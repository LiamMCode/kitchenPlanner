import * as React from 'react';
import { widgetRepository } from '../index';
import { WidgetUnitData, unitsRepositoryService } from '../axios/UnitsRepositoryService';
import { Widget } from '../src/canvas/Widget';
import { UnitSize } from 'app/canvas/WidgetRepository';

interface hoveredState {
    isHovered: boolean;
    list: Map<string, WidgetUnitData>;
}

interface UnitListBoxProps {
    title: string;
}

export class NavBarDropDown extends React.Component<UnitListBoxProps, hoveredState> {
    public state: hoveredState = {
        isHovered: false,
        list: new Map(),
    };

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
        const { dimensions, widgetStyle } = unitsRepositoryService.getUnit(selectedUnit, unitType);
        const widget = new Widget(unitType, selectedUnit, dimensions, widgetStyle);

        widgetRepository.add(widget);
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
                                const [id, unitData] = listItem;
                                return (
                                    <li
                                        className='nav-link'
                                        style={{ padding: '0px' }}
                                        key={id}
                                        onClick={() => this.spawnUnit(unitData.name, unitData.type)}
                                    >
                                        {unitData.name}
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
