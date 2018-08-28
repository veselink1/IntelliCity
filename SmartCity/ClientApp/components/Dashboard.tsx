import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as ReactGridLayout from 'react-grid-layout';
import { Icon } from 'antd';
import styled from 'styled-components';
import mdPalette from '../utils/md-palette';
import Navigation from './Navigation';
import AuthenticationLock from './AuthenticationLock';
import DashboardSidebar from './DashboardSidebar';
import SearchWidget from './widgets/SearchWidget';
import TestWidget from './widgets/TestWidget';
import EVNWidget from './widgets/EVNWidget';
import VIKWidget from './widgets/VIKWidget';
import AirChartWidget from './widgets/AirChartWidget';
import CalendarWidget from './widgets/CalendarWidget';
import CameraWidget from './widgets/CameraWidget';
import GMapsWidget from './widgets/GMapsWidget';
import AccuWeatherWidget from './widgets/AccuWeatherWidget';
import NewsWidget from './widgets/NewsWidget';
import EventsWidget from './widgets/EventsWidget';
import HeatingWidget from './widgets/HeatingWidget';
import BurgasBusWidget from './widgets/BurgasBusWidget';
import PreviewWidget from './widgets/PreviewWidget';
import { getAllCameras, getCamera } from '../api/cameraApi';
import guid from '../utils/guid';

const GridLayout = ReactGridLayout.WidthProvider(ReactGridLayout.Responsive);

type Layout = {
    i: string;
    x: number;
    y: number;
    w: number;
    minW?: number;
    maxW?: number;
    h: number;
    minH?: number;
    maxH?: number;
    static?: boolean;
    moved?: boolean,
};

type Layouts = {
    [breakpoint: string]: Layout[],
};

type State = {
    mounted: boolean,
    layouts: Layouts,
    sidebar: boolean,
    widgets: React.ReactElement<{}>[],
};

const defaultLayouts: Layouts = {
    lg: [
        {
            "w": 2,
            "h": 2,
            "x": 0,
            "y": 0,
            "i": "calendar",
            "minW": 1,
            "minH": 2,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 0,
            "y": 2,
            "i": "evn",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 4,
            "y": 4,
            "i": "vik",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 4,
            "y": 0,
            "i": "gmaps",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 2,
            "y": 6,
            "i": "cam-casino",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 0,
            "y": 6,
            "i": "cam-port",
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 6,
            "y": 6,
            "i": "cam-municip",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 6,
            "x": 6,
            "y": 0,
            "i": "accu-weather",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 6,
            "x": 2,
            "y": 0,
            "i": "news",
            "moved": false,
            "static": false
        },
        {
            "w": 2,
            "h": 4,
            "x": 4,
            "y": 8,
            "i": "test",
            "minW": 1,
            "minH": 4,
            "moved": false,
            "static": false
        }
    ]
};

const layoutsKey = 'dashboard-layouts';

export default class Dashboard extends React.Component<RouteComponentProps<{}>, State> {

    public constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            mounted: false,
            sidebar: false,
            layouts: defaultLayouts,
            widgets: [
                <div key="calendar">
                    <CalendarWidget onClose={this.handleRemoveWidgetClicked.bind(this, "calendar")} />
                </div>,
                <div key="evn">
                    <EVNWidget onClose={this.handleRemoveWidgetClicked.bind(this, "evn")} />
                </div>,
                <div key="vik">
                    <VIKWidget onClose={this.handleRemoveWidgetClicked.bind(this, "vik")} />
                </div>,
                <div key="gmaps">
                    <GMapsWidget onClose={this.handleRemoveWidgetClicked.bind(this, "gmaps")} />
                </div>,
                <div key="cam-casino">
                    <CameraWidget cameraId="burgas-sea-casino" onClose={this.handleRemoveWidgetClicked.bind(this, "cam-casino")} />
                </div>,
                <div key="cam-port">
                    <CameraWidget cameraId="burgas-port" onClose={this.handleRemoveWidgetClicked.bind(this, "cam-port")} />
                </div>,
                <div key="cam-municip">
                    <CameraWidget cameraId="burgas-municipality" onClose={this.handleRemoveWidgetClicked.bind(this, "cam-municip")} />
                </div>,
                <div key="cam-windsurf">
                    <CameraWidget cameraId="burgas-windsurf" onClose={this.handleRemoveWidgetClicked.bind(this, "cam-windsurf")} />
                </div>,
                <div key="accu-weather">
                    <AccuWeatherWidget onClose={this.handleRemoveWidgetClicked.bind(this, "accu-weather")} />
                </div>,
                <div key="news">
                    <NewsWidget onClose={this.handleRemoveWidgetClicked.bind(this, "news")} />
                </div>,
                <div key="events">
                    <EventsWidget onClose={this.handleRemoveWidgetClicked.bind(this, "news")} />
                </div>,
                <div key="heating">
                    <HeatingWidget onClose={this.handleRemoveWidgetClicked.bind(this, "heating")} />
                </div>,
                <div key="burgas-bus">
                    <BurgasBusWidget onClose={this.handleRemoveWidgetClicked.bind(this, "burgas-bus")} />
                </div>,
                <div key="airchart">
                    <AirChartWidget onClose={this.handleRemoveWidgetClicked.bind(this, "airchart")} />
                </div>,
                <div key="test">
                    <TestWidget onClose={this.handleRemoveWidgetClicked.bind(this, "test")} />
                </div>,
            ],
        };
    }

    public componentDidMount() {
        this.setState({
            mounted: true,
            layouts: this.getInitialLayouts()
        });
    }

    public componentWillUnmount() {
        this.preserveState();
    }

    private getInitialLayouts(): Layouts {
        let layoutsJSON: string | null = null;
        if ('localStorage' in self && (layoutsJSON = localStorage.getItem(layoutsKey)) !== null) {
            return JSON.parse(layoutsJSON);
        } else {
            return defaultLayouts;
        }
    }

    private handleRemoveWidgetClicked(key: string) {
        let widgets = this.state.widgets
            .filter(widget => widget.key != key);
        this.setState({ widgets }, () => {
            this.preserveState();
        });
    }

    private onLayoutChange = (layout: Layout, layouts: Layouts) => {
        this.setState({ layouts });
        this.preserveState(layouts);
    };

    private preserveState(layouts: Layouts = this.state.layouts) {
        if (this.state.mounted && 'localStorage' in self) {
            localStorage.setItem(layoutsKey, JSON.stringify(this.state.layouts));
        }
    }

    private handleAddWidgetClicked = (widgetClass: { new(): React.ReactElement<{}> }) => {
        let widgets = this.state.widgets.slice();
        let Widget = widgetClass as any;
        let key = guid();
        widgets.push(
            <div key={key}>
                <Widget onClose={this.handleRemoveWidgetClicked.bind(this, key)} />
            </div>
        );
        this.setState({ widgets }, () => {
            this.preserveState();
        });
    };

    public render() {
        return (
            <div>
                <Navigation {...this.props} />
                <SearchWidget style={{
                    marginTop: 20
                }} />
                <DashboardSidebar
                    visible={this.state.sidebar}
                    onChange={visible => this.setState({ sidebar: visible })}
                    transitionDuration={200}
                    renderWidgets={() => {
                        let previews = [
                            CalendarWidget,
                            NewsWidget,
                            AirChartWidget,
                            EventsWidget,
                            EVNWidget,
                            VIKWidget,
                            AccuWeatherWidget,
                            TestWidget,
                            HeatingWidget,
                            BurgasBusWidget,
                        ].map((Widget: any, key: number) => (
                            <PreviewWidget key={key} onClick={this.handleAddWidgetClicked.bind(this, Widget)} height={240}><Widget /></PreviewWidget>
                        ));
                        return previews;
                    }}
                />
                <GridLayout
                    className="layout"
                    layouts={this.state.layouts}
                    onLayoutChange={this.onLayoutChange}
                    cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
                    measureBeforeMount={false}
                    rowHeight={64}
                    margin={[24, 24]}>
                    {this.state.widgets}
                </GridLayout>
                <div style={{ marginBottom: 240 }} />
            </div >
        );
    }
}
