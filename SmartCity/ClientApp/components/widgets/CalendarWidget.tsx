import * as React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import { Circle } from '../Shapes';
import CenteredVertically from '../CenteredVertically';
import mdPalette from '../../utils/md-palette';

type ClockState = {
    hours: number,
    minutes: number,
};

class Clock extends React.Component<{}, ClockState> {

    private updateHandle: number | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
        };
    }

    public componentDidMount() {
        this.updateHandle = setInterval(this.update, 1000);
        this.update();
    }

    public componentWillUnmount() {
        if (this.updateHandle != null) {
            clearInterval(this.updateHandle);
            this.updateHandle = null;
        }
    }

    private update = () => {
        let date = new Date(Date.now());
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours != this.state.hours
            || minutes != this.state.minutes) {
            this.setState({
                hours: date.getHours(),
                minutes: date.getMinutes(),
            });
        }
    };

    public render() {
        let {
            hours,
            minutes,
        } = this.state;
        return (
            <div style={{
                position: 'relative',
                borderRadius: 4,
                backgroundColor: mdPalette.get('Grey', '900'),
                fontSize: 42,
                textAlign: 'center',
                fontWeight: 400,
                letterSpacing: 8,
                fontFamily: '"Roboto Mono", monospace'
            }}>
                <Circle
                    radius={8}
                    fill="white"
                    strokeWidth={0}
                    style={{
                        position: 'absolute',
                        top: 30,
                        left: -3
                    }}
                />
                <Circle
                    radius={8}
                    fill="white"
                    strokeWidth={0}
                    style={{
                        position: 'absolute',
                        top: 30,
                        right: -3
                    }}
                />
                <span>{prefixTime(String(hours))}</span>
                <span style={{
                    color: mdPalette.get('Amber', 'A200'),
                    fontWeight: 'bold',
                    position: 'relative',
                    top: -4
                }}>:</span>
                <span>{prefixTime(String(minutes))}</span>
            </div>
        );
    }
}

function prefixTime(x: string): string {
    if (x.length == 1) {
        return '0' + x;
    } else {
        return x;
    }
}

type DayState = {
    day: number,
};

class Day extends React.Component<{}, DayState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            day: (new Date(Date.now())).getDate(),
        }
    }

    public render() {
        return (
            <div style={{
                position: 'relative',
                borderRadius: 4,
                backgroundColor: mdPalette.get('Grey', '900'),
                fontSize: 32,
                textAlign: 'center',
                fontWeight: 300,
                fontFamily: '"Roboto Mono", monospace'
            }}>
                {prefixTime(String(this.state.day))}
            </div>
        );
    }
}

type MonthState = {
    month: number,
};

class Month extends React.Component<{}, MonthState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            month: (new Date(Date.now())).getMonth(),
        }
    }

    public render() {
        return (
            <div style={{
                position: 'relative',
                borderRadius: 4,
                color: mdPalette.get('Amber', 'A200'),
                backgroundColor: mdPalette.get('Grey', '900'),
                fontSize: 32,
                textAlign: 'center',
                fontWeight: 300,
                letterSpacing: 8,
                fontFamily: '"Roboto Mono", monospace'
            }}>
                {getMonthShortName(this.state.month).toLocaleUpperCase()}
            </div>
        );
    }
}

function getMonthShortName(month: number): string {
    switch (month) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
        default: throw new Error("Invalid month index");
    }
}

export default class CalendarWidget extends React.Component<{ onClose: () => void }, {}> {
    public render() {
        return (
            <Widget
                title={null}
                onClose={this.props.onClose}
                dragContent={true}
                padding="24px 8px"
                foreground="white"
                background="white"
                border="black">
                <CenteredVertically>
                    <Clock />
                    <div style={{ marginTop: 16 }}>
                        <div style={{ width: '40%', paddingRight: 8, display: 'inline-block' }}>
                            <Day />
                        </div>
                        <div style={{ width: '60%', paddingLeft: 8, display: 'inline-block' }}>
                            <Month />
                        </div>
                    </div>
                </CenteredVertically>
            </Widget>
        );
    }
}