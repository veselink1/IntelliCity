import * as React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import { VIKModel, getVIKData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';
import { Camera, getCamera } from '../../api/cameraApi';

type State = {
    isLoading: boolean,
};

export default class GMapsWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    public async componentDidMount() {

    }

    public componentWillUnmount() {

    }

    public render() {
        return (
            <Widget
                loading={this.state.isLoading}
                title={<div>
                    <Icon type="environment" style={{ marginTop: 2, marginRight: 12 }} />
                    Карти
                </div>}
                onClose={this.props.onClose}
                padding={0}
                overflow="hidden"
                foreground="black"
                background={mdPalette.get('Grey', '200')}
                border={mdPalette.get('Green', '500')}>
                <iframe
                    onLoad={() => this.setState({ isLoading: false })}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB5UuFfWVtzzFQsSpauDhb2F_UTzoPVMl8&q=Burgas,Bulgaria"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </Widget>
        );
    }
}