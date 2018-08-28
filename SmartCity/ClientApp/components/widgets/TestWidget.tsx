import * as React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import mdPalette from '../../utils/md-palette';

export default class TestWidget extends React.Component<{ onClose: () => void }, {}> {
    public render() {
        return (
            <Widget
                title="Test Widget"
                onClose={this.props.onClose}
                padding={24}
                foreground="black"
                background={mdPalette.get('Green', '500')}
                border={mdPalette.get('Green', '500')}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Widget>
        );
    }
}