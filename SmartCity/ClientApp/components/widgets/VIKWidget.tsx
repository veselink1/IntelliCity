import * as React from 'react';
import { Card, Table } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import CenteredVertically from '../CenteredVertically';
import { VIKModel, getVIKData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';

const VIKText = () => (
    <div style={{
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: mdPalette.get('Blue', 'A200'),
        fontSize: 18
    }}>ВиК</div>
);

const VIKLogo = styled.div`
    width: 50px;
    height: 18px;
    background-repeat: no-repeat;
    background-image: url(/img/vik-logo.png);
    background-size: contain;
`;

type State = {
    data: VIKModel[] | null,
};

export default class VIKWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            data: null,
        };
    }

    public async componentDidMount() {
        let data: VIKModel[] = await getVIKData();
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
                style={{
                    marginBottom: 4,
                }}
                bodyStyle={{
                    padding: '8px 24px'
                }}>
                {model.message}
            </Card>
        ));
    };

    public render() {
        return (
            <Widget
                onClose={this.props.onClose}
                loading={this.isLoading}
                title={<CenteredVertically><VIKLogo /></CenteredVertically>}
                padding={24}
                foreground="black"
                background={'#92bbe2' || mdPalette.get('Blue', '300')}
                border={'#92bbe2'}>
                {this.renderContent()}
            </Widget>
        );
    }
}