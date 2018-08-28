import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Table, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import ResponsiveLayout from '../ResponsiveLayout';
import { NewsItemModel, getNewsData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';
import { Menu, Button, Dropdown } from 'antd';
import { FBEvent, getUpcomingEventsAsync, createEventUrl } from '../../utils/fbSdk';
import { ApplicationState } from '../../store';
import * as Account from '../../store/Account';

const Event = styled.div`
    background-color: white;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 24px;
    cursor: pointer;

    &.event-item--wide {
        height: 148px;
        .image {
            height: 100%;
            background-size: cover;
            background-position: center;
        }

        .header {
            padding: 16px;

            .title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 15px;
                font-weight: 500;
            }
            
            .date {
                position: relative;
                top: -2px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        .description-container {
            height: 100%;
            padding-bottom: 16px;
        }

        .description {
            height: 100%;
            padding: 0 16px 0;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    &.event-item--small {
        height: 284px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .image {
            height: 120px;
            background-size: cover;
            background-position: center;
        }

        .header {
            padding: 16px 16px 0;

            .title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 15px;
                font-weight: 500;
            }
            
            .date {
                position: relative;
                top: -2px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        .description-container {
            height: 100%;
            padding-bottom: 14px;
        }

        .description {
            height: 100%;
            padding: 0 16px 0;
            text-overflow: ellipsis;
            white-space: normal;
            overflow: hidden;
        }
    }
`;

type SelfProps = { onClose: () => void };
type Props = Account.AccountState & typeof Account.actionCreators & { children?: React.ReactNode } & SelfProps;

type State = {
    data: FBEvent[] | null,
    isLoading: boolean
};

class EventsWidget extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true
        };
    }

    public async componentDidMount() {
        let data: FBEvent[] = await getUpcomingEventsAsync(this.props.profile!.fbAccessToken, ['Бургас'], ['Burgas', 'Bourgas'], 20);
        this.setState({ data: data.slice(0, 9), isLoading: false });
    }

    private get isLoading(): boolean {
        return this.state.data === null;
    }

    private handleEventItemClicked = (model: FBEvent) => {
        window.location.href = createEventUrl(model.id);
    };

    private renderContent = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <Event
                key={index}
                className="event-item event-item--wide"
                onClick={this.handleEventItemClicked.bind(this, model)}>
                <DockPanel
                    leftWidth={160}
                    left={
                        <div
                            className="image"
                            style={{
                                backgroundImage: `url('${model.picture}')`
                            }}
                        />
                    }>
                    <DockPanel
                        topHeight={60}
                        top={
                            <div className="header">
                                <div className="title">{model.name}</div>
                                <div className="date">{(new Date(Date.parse(model.start_time))).toLocaleString()}</div>
                            </div>
                        }>
                        <div className="description-container">
                            <div className="description">{model.description}</div>
                        </div>
                    </DockPanel>
                </DockPanel>
            </Event >
        ));
    };

    private renderContentSmall = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <Event
                key={index}
                className="event-item event-item--small"
                onClick={this.handleEventItemClicked.bind(this, model)}>

                <DockPanel
                    topHeight={180}
                    top={
                        <div>
                            <div
                                className="image"
                                style={{
                                    backgroundImage: `url('${model.picture}')`
                                }}
                            />
                            <div className="header">
                                <div className="title">{model.name}</div>
                                <div className="date">{(new Date(Date.parse(model.start_time))).toLocaleString()}</div>
                            </div>
                        </div>
                    }>
                    <div className="description-container">
                        <div className="description">{model.description}</div>
                    </div>
                </DockPanel>
            </Event >
        ));
    };

    public render() {
        return (
            <Widget
                loading={this.state.isLoading}
                onClose={this.props.onClose}
                title={<div><Icon type="schedule" style={{ marginTop: 2, marginRight: 12 }} />Събития</div>}
                padding={8}
                foreground="black"
                background={mdPalette.get('Grey', '100')}
                border={mdPalette.get('Grey', '100')}>
                <div style={{ padding: '16px 16px 0px 16px' }}>
                    <ResponsiveLayout
                        triggers={[{
                            isDefault: true,
                            render: this.renderContent,
                        }, {
                            maxWidth: 400,
                            render: this.renderContentSmall,
                        }]}
                    />
                </div>
            </Widget>
        );
    }
}


let Connected = connect(
    (state: ApplicationState) => state.account, // Selects which state properties are merged into the component's props
    Account.actionCreators // Selects which action creators are merged into the component's props
)(EventsWidget) as any;

export default (props: SelfProps): React.ReactElement<{}> => (<Connected {...props} />);