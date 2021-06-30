import * as React from 'react';

export class CanvasComponent extends React.Component {
    public render(): React.ReactNode {
        return (
            <div
                style={{
                    marginTop: '3%',
                }}
            >
                <canvas id='canvas' />
            </div>
        );
    }
}
