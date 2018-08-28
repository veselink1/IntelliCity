import * as React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import NativeNode, { parseHTML } from '../NativeNode';
import mdPalette from '../../utils/md-palette';

function insertScript(url: string) {
    let script = document.createElement('script');
    script.src = 'https://oap.accuweather.com/launch.js';
    document.body.appendChild(script);
}

const Container = styled.div`
    overflow-x: hidden;
    .aw-get-this-widget {
        display: none !important;
    }
    .aw-more-block {
        display: none !important;
    }
`;

class AccuWeather36HourWidget extends React.Component<{}, {}> {
    private static inserted: boolean = false;
    private static element: HTMLElement | null = null;

    public componentDidMount() {
        if (!AccuWeather36HourWidget.element) {
            AccuWeather36HourWidget.element = parseHTML(`
                <div
                    id="awtd1507786692320"
                    class="aw-widget-36hour"
                    data-locationkey="47424"
                    data-unit="c"
                    data-language="bg"
                    data-useip="false"
                    data-uid="awtd1507786692320"
                    data-editlocation="false">
                </div>
            `);
            this.forceUpdate(() => {
                if (!AccuWeather36HourWidget.inserted) {
                    insertScript('https://oap.accuweather.com/launch.js');
                    AccuWeather36HourWidget.inserted = true;
                }
            });
        }
    }

    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        return (
            <Container>
                <a href="https://www.accuweather.com/bg/bg/burgas/47424/current-weather/47424" className="aw-widget-legal" />
                {AccuWeather36HourWidget.element &&
                    <NativeNode node={AccuWeather36HourWidget.element} />}
            </Container>
        );
    }
}

export default class AccuWeatherWidget extends React.Component<{ onClose: () => void }, {}> {
    public render() {
        return (
            <Widget
                title={
                    <div>
                        <Icon type="cloud" style={{ marginTop: 2, marginRight: 12 }} />Прогноза за времето
                    </div>
                }
                onClose={this.props.onClose}
                padding={0}
                foreground="black"
                background="white"
                border={mdPalette.get('Orange', '500')}>
                <AccuWeather36HourWidget />
            </Widget>
        );
    }
}