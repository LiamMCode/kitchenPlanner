import * as React from 'react';
import '../css/index.css';
import { widgetRepository, mouseEventRouter } from '../index';
import { NavBarDropDown } from './NavBarDropDown';

export class NavBar extends React.Component<{}, {}> {
    public validateEmail(input: string): boolean {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return Boolean(input.match(validRegex));
    }

    public savePlanPrompts(): void {
        let planName: string;
        let customerEmail: string;

        planName = prompt('Please Enter a name for the plan');
        if (planName.trim() === '') {
            alert('please enter a plan name');
        } else {
            customerEmail = prompt('Please enter the customers Email');
            if (!this.validateEmail(customerEmail)) {
                alert('please enter a valid email address');
            } else {
                // WidgetRepository.saveAndSerialise(planName, customerEmail);
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
        // WidgetRepository.saveAndSerialise(planName, customerEmail);
    };

    private deleteUnit = (): void => {
        mouseEventRouter.onDeleteEvent();
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

                        <li className='nav-link' id='deleteUnit' onClick={this.deleteUnit}>
                            <i className='fa fa-trash-o'> Delete Unit</i>
                        </li>
                    </div>
                </nav>
            </>
        );
    }
}
