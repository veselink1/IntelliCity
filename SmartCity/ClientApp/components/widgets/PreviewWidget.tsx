import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import CenteredVertically from '../CenteredVertically';

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background-color: transparent;
    color: transparent;
    transition: 0.1s all linear;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
        color: white;
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    text-shadow: none;

    &> div {
        position: relative;
        top: calc(50% - 24px);
        margin: 0 auto;
        width: 64px;
        height: 64px;
        border-radius: 64px;
        margin: 0 auto;
    }

    &:hover {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
`;

type Props = {
    onClick: () => void,
    height: number,
};

export default class PreviewWidget extends React.Component<Props, {}> {

    private handleClick = () => {
        this.props.onClick();
    };

    public render() {
        let {
            height,
            children,
        } = this.props;

        return (
            <div style={{ height, marginBottom: 24, position: 'relative' }}>
                {children}
                <Overlay>
                    <IconWrapper>
                        <div onClick={this.handleClick}>
                            <Icon
                                type="plus-circle"
                                style={{ fontSize: 64 }}
                            />
                        </div>
                    </IconWrapper>
                </Overlay>
            </div>
        );
    }

}
