import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Table, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import ResponsiveLayout from '../ResponsiveLayout';
import CenteredVertically from '../CenteredVertically';
import mdPalette from '../../utils/md-palette';
import { Menu, Button, Dropdown } from 'antd';
import { HeatingMessageModel, getHeatingData } from '../../api/dataApi';

const HeatingText = () => (
    <div style={{
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: mdPalette.get('Blue', 'A200'),
        fontSize: 18
    }}>ВиК</div>
);

const HeatingLogo = styled.div`
    width: 18px;
    height: 18px;
    position: relative;
    top: 4px;
    margin-right: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-image: url(/img/toplo-bs-logo.png);
    background-size: contain;
`;

type State = {
    data: HeatingMessageModel[] | null,
};

export default class HeatingWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            data: null,
        };
    }

    public async componentDidMount() {
        let data: HeatingMessageModel[] = await getHeatingData();
        this.setState({ data });
    }

    private get isLoading(): boolean {
        return this.state.data === null;
    }

    private renderContent = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <Card
                key={index}
                title={model.title}
                style={{
                    marginBottom: 4,
                }}
                bodyStyle={{
                    padding: '24px 24px'
                }}>
                {model.content}
            </Card>
        ));
    };

    public render() {
        return (
            <Widget
                onClose={this.props.onClose}
                loading={this.isLoading}
                title={<CenteredVertically><HeatingLogo />Топлофикация</CenteredVertically>}
                padding={24}
                foreground="black"
                background={mdPalette.get('Red', '300')}
                border={'#92bbe2'}>
                {this.renderContent()}
            </Widget>
        );
    }
}