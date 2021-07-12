import * as React from 'react';
import { getData } from '../axios/APIDataHandler';
import '../css/index.css';
import { widgetRepository, mouseEventRouter } from '../index';
import { NavBarDropDown } from './NavBarDropDown';

export class NavBar extends React.Component<{}, {}> {
    private planName: string;
    private customerEmail: string;

    public validateEmail(input: string): boolean {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return Boolean(input.match(validRegex));
    }

    public savePlanPrompts(): void {
        this.planName = prompt('Please Enter a name for the plan');
        if (this.planName.trim() === '') {
            alert('please enter a plan name');
        } else {
            this.customerEmail = prompt('Please enter the customers Email');
            if (!this.validateEmail(this.customerEmail)) {
                alert('please enter a valid email address');
            } else {
                widgetRepository.saveAndSerialise(this.planName, this.customerEmail);
            }
        }
    }

    public newPlan = () => {
        const newPlanString =
            'Are you sure you want to create a new plan, you will lose the current plan';
        if (confirm(newPlanString)) {
            if (confirm('Would you like to save the current plan')) {
                this.savePlanPrompts();
                widgetRepository.deleteAll();
            }
            widgetRepository.deleteAll();
        }
    };

    private savePlan = (): void => {
        this.savePlanPrompts();
        widgetRepository.saveAndSerialise(this.planName, this.customerEmail);
    };

    private deleteUnit = (): void => {
        mouseEventRouter.onDeleteEvent();
    };

    private loadPlan = (): void => {
        const file = prompt('Enter the filename of the plan');
        if (file === '') {
            alert('this is not a valid plan name please try again');
        } else {
            const email = prompt('Enter the customers email address');

            if (this.validateEmail(email)) {
                const url =
                    'https://symfony-sandbox.dev.wrenkitchens.com/data/saved-plans?username=' +
                    email +
                    '&filename=' +
                    file;
                getData(url);
            } else {
                alert('this is not a valid email address please try again');
            }
        }
    };

    private rotate = (rotation: number): void => {
        mouseEventRouter.onRotate(rotation);
    };

    public render(): React.ReactNode {
        return (
            <>
                <nav className='navbar'>
                    <div className='nav-bar-container'>
                        <NavBarDropDown title={'Wall Units'} />
                        <NavBarDropDown title={'Base Units'} />
                        <NavBarDropDown title={'Tower Units'} />
                        <NavBarDropDown title={'Decor Units'} />
                        <NavBarDropDown title={'Worktop Units'} />

                        <li className='nav-link' id='NewPlan' onClick={this.newPlan}>
                            New Plan
                        </li>

                        <li className='nav-link' id='SavePlan' onClick={this.savePlan}>
                            Save Plan
                        </li>

                        <li className='nav-link' id='LoadPlan' onClick={this.loadPlan}>
                            Load Plan
                        </li>

                        <li className='nav-link' id='deleteUnit' onClick={this.deleteUnit}>
                            <i className='fa fa-trash-o'> Delete Unit</i>
                        </li>

                        <li className='nav-link' id='rotationPlus' onClick={() => this.rotate(45)}>
                            <i className='fa fa-plus'> Rotate Clockwise</i>
                        </li>

                        <li className='nav-link' id='rotationPlus' onClick={() => this.rotate(-45)}>
                            <i className='fa fa-minus'> Rotate AntiClockwise</i>
                        </li>
                    </div>
                </nav>
            </>
        );
    }
}
