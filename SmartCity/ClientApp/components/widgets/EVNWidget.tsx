import * as React from 'react';
import { Card, Table } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import ResponsiveLayout from '../ResponsiveLayout';
import { EVNModel, getEVNData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';

const exampleDatum = {
    region: 'БУРГАС',
    cec: 'Х-36 БУРГАС ЮГ',
    details: 'ГР. СРЕДЕЦ, ОБЛ. БУРГАС - ЮГОИЗТОЧНАТА ЧАСТ НА ГР.СРЕДЕЦ: УЛ ДРУЖБА, УЛ.ДОБРУДЖА, УЛ.А.СТАМБОЛИЙСКИ, УЛ.БАЧО КИРО И ОБЕКТИ В РАЙОНА',
    startDateTime: new Date(2017, 6, 20, 15, 0, 0),
    endDateTime: new Date(2017, 6, 20, 19, 30, 0),
};

const exampleData = repeat(exampleDatum, 10);

function repeat<T>(x: T, n: number): T[] {
    let array: T[] = [];
    for (let i = 0; i < n; i++) {
        array.push(x);
    }
    return array;
}

const EVNText = () => (
    <div style={{ fontStyle: 'italic', fontSize: 18 }}>
        <span style={{ color: 'black' }}>E</span>
        <span style={{ color: 'red' }}>V</span>
        <span style={{ color: 'black' }}>N</span>
    </div>
);

const DatumTitle = styled.div`
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
`;

const DatumContent = styled.div`
    font-weight: normal;
`;

type State = {
    data: EVNModel[] | null,
};

export default class EVNWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            data: null,
        };
    }

    public async componentDidMount() {
        let data: EVNModel[] = await getEVNData();
        this.setState({ data: data.slice(0, 9) });
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
                    marginBottom: 24,
                }}>

                <DatumTitle>Регион</DatumTitle>
                <DatumContent>{model.region}</DatumContent>
                <Separator />

                <DatumTitle>КЕЦ</DatumTitle>
                <DatumContent>{model.cec}</DatumContent>
                <Separator />

                <DatumTitle>От</DatumTitle>
                <DatumContent>{model.startDateTime.toLocaleString()}</DatumContent>
                <Separator />

                <DatumTitle>До</DatumTitle>
                <DatumContent>{model.endDateTime.toLocaleString()}</DatumContent>
                <Separator />

                <DatumTitle>Детайли</DatumTitle>
                <DatumContent>{model.details}</DatumContent>
                
            </Card>
        ));
    };

    private renderContentLarge = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <Card
                key={index}
                style={{
                    marginBottom: 24,
                }}>

                <DockPanel
                    left={<DatumTitle>Регион</DatumTitle>}
                    leftWidth="4.5em"
                    children={<DatumContent>{model.region}</DatumContent>}
                />

                <DockPanel
                    left={<DatumTitle>КЕЦ</DatumTitle>}
                    leftWidth="4.5em"
                    children={<DatumContent>{model.cec}</DatumContent>}
                />

                <DockPanel
                    left={<DatumTitle>От</DatumTitle>}
                    leftWidth="4.5em"
                    children={<DatumContent>{model.startDateTime.toLocaleString()}</DatumContent>}
                />

                <DockPanel
                    left={<DatumTitle>До</DatumTitle>}
                    leftWidth="4.5em"
                    children={<DatumContent>{model.endDateTime.toLocaleString()}</DatumContent>}
                />

                <Separator />

                <DockPanel
                    left={<DatumTitle>Детайли</DatumTitle>}
                    leftWidth="4.5em"
                    children={<DatumContent>{model.details}</DatumContent>}
                />

            </Card>
        ));
    }

    public render() {
        return (
            <Widget
                loading={this.isLoading}
                title={<EVNText />}
                onClose={this.props.onClose}
                padding={24}
                foreground="black"
                background={mdPalette.get('Red', '300')}
                border={mdPalette.get('Red', '300')}>
                <ResponsiveLayout
                    triggers={[{
                        isDefault: true,
                        render: this.renderContent,
                    }, {
                        minWidth: 320,
                        render: this.renderContentLarge
                    }]} />
            </Widget>
        );
    }
}