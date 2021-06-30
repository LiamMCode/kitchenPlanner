import * as React from 'react';
import '../css/index.css';
import { polygonRepository, mouseEventRouter } from '../index';
import { NavBarDropDown } from './NavBarDropDown';

export class NavBar extends React.Component<{}, {}> {
    public newPlan = () => {
        if (
            confirm(
                'Are you sure you want to create a new plan, you will lose any progress on the current plan',
            )
        ) {
            polygonRepository.deleteAll();
        }
    };

    public deleteUnit = () => {
        mouseEventRouter.onDeleteEvent();
    };

    public render(): React.ReactNode {
        return (
            <>
                <nav className='navbar'>
                    <div className='nav-bar-container'>
                        <NavBarDropDown
                            listItems={['WallSizeA', 'WallSizeB']}
                            title={'Wall Units'}
                        />
                        <NavBarDropDown
                            listItems={['BaseSizeA', 'BaseSizeB']}
                            title={'Base Units'}
                        />
                        <NavBarDropDown
                            listItems={['TowerSizeA', 'TowerSizeB']}
                            title={'Tower Units'}
                        />
                        <NavBarDropDown
                            listItems={[
                                'DecorSizeA',
                                'DecorSizeB',
                                'DecorSizeC',
                                'DecorSizeD',
                                'DecorSizeE',
                                'DecorSizeF',
                            ]}
                            title={'Decor Units'}
                        />
                        <NavBarDropDown
                            listItems={['WorktopSizeA', 'WorktopSizeB']}
                            title={'Worktop Units'}
                        />

                        <li className='nav-link' id='NewPlan' onClick={this.newPlan}>
                            New
                        </li>
                        <li className='nav-link' id='deleteUnit' onClick={this.deleteUnit}>
                            <i className='fa fa-trash-o'> Delete Unit</i>
                        </li>
                    </div>
                </nav>
            </>
        );
    }
}
