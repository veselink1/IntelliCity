import * as React from 'react';
import mdPalette from '../utils/md-palette';

type Props = {
    thickness?: number | string,
    color?: string,
    margin?: number | string,
    absolute?: boolean,
};

export default class Separator extends React.Component<Props, {}> {

    public render() {
        const {
            thickness,
            color,
            margin,
            absolute
        } = this.props;
        return (
            <div style={{
                height: thickness != null ? thickness : 1,
                backgroundColor: color != null ? color : mdPalette.get('Grey', '200'),
                margin: margin != null ? margin : '4px 0',
                position: absolute ? 'absolute' : 'static',
                left: 0,
                right: 0,
            }} />
        );
    }

}