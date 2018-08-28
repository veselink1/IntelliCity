import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Sidebar = styled.div`
    position: fixed;
    top: 0;
    right: -320px;
    width: 320px;
    height: 100vh;
    transition: 0.2s transform ease-in-out;
    margin-top: 48px;
    z-index: 200;
    overflow: visible;
    color: black;
    background-color: #303030;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    &.visible {
        transform: translateX(-320px);
    }
    &.hidden {
        transform: translateX(0px);
    }
`;

const OpenHandle = styled.div`
    position: absolute;
    top: 10px;
    left: -32px;
    border-bottom-left-radius: 64px;
    border-top-left-radius: 64px;
    height: 64px;
    width: 32px;
    color: white;
    background-color: #424242;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    padding-top: 23px;
    padding-left: 6px;
    text-align: center;

    &:hover {
        background-color: #212121;
    }

    i {
        font-size: 20px;
    }
`;

type Milliseconds = number;

type Props = {
    visible: boolean,
    onChange: (visible: boolean) => void,
    transitionDuration: Milliseconds,
    renderWidgets: () => React.ReactNode,
};

type State = {
    renderWidgets: boolean,
};

export default class DashboardSidebar extends React.Component<Props, State> {

    public state: State = {
        renderWidgets: this.props.visible,
    };

    public render() {
        let {
            visible,
            renderWidgets,
        } = this.props;

        return (
            <Sidebar className={visible ? 'visible' : ''}>
                <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: 24 }}>
                    {renderWidgets()}
                </div>
                <OpenHandle onClick={() => this.props.onChange(!visible)}>
                    {visible ? <Icon type="right" /> : <Icon type="left" />}
                </OpenHandle>
            </Sidebar>
        );
    }

}