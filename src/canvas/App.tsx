import * as React from 'react';
import { CanvasComponent } from '../../react-components/CanvasComponent';
import { NavBar } from '../../react-components/NavBar';

export class App extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                <NavBar />
                <CanvasComponent />
            </div>
        );
    }
}
