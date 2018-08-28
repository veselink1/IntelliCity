import * as React from 'react';
import styled from 'styled-components';

const DockedItem = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

type Props = {
    top?: React.ReactNode,
    topHeight?: number | string,
    left?: React.ReactNode,
    leftWidth?: number | string,
    right?: React.ReactNode,
    rightWidth?: number | string,
    bottom?: React.ReactNode,
    bottomHeight?: number | string,
};

export default class DockPanel extends React.Component<Props, {}> {

    public render() {
        const {
            top, topHeight,
            left, leftWidth,
            right, rightWidth,
            bottom, bottomHeight,
            children,
        } = this.props;

        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    paddingLeft: leftWidth,
                    paddingTop: topHeight,
                    paddingRight: rightWidth,
                    paddingBottom: bottomHeight,
                }}>

                {left && <DockedItem children={left} style={{ left: 0, width: leftWidth, height: '100%' }} />}
                {top && <DockedItem children={top} style={{ top: 0, width: '100%', height: topHeight }} />}
                {right && <DockedItem children={right} style={{ right: 0, width: rightWidth, height: '100%' }} />}
                {bottom && <DockedItem children={bottom} style={{ bottom: 0, width: '100%', height: bottomHeight }} />}

                {children}
            </div>
        );
    }

}