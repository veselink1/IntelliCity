import * as React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import { VIKModel, getVIKData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';
import { Camera, getCamera } from '../../api/cameraApi';

class DeflickerBackground extends React.Component<{ url: string | null }, { prevUrl: string | null }> {

    private handle: number | null;

    public constructor(props: { url: string }) {
        super(props);
        this.handle = null;
        this.state = {
            prevUrl: props.url
        };
    }

    public componentWillReceiveProps(props: { url: string | null }) {
        if (props.url !== this.state.prevUrl) {
            if (this.handle) {
                clearTimeout(this.handle);
            }
            this.handle = setTimeout(() => {
                this.setState({ prevUrl: props.url });
            }, 66) as any as number;
        }
    }

    public render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundImage: `url('${this.state.prevUrl || void 0}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundImage: `url('${this.props.url || void 0}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>
        );
    }
}

type Props = {
    cameraId: string,
    onClose: () => void
};

type State = {
    camera: Camera | null,
    url: string | null,
};

export default class VIKWidget extends React.Component<Props, State> {

    private cancelStream: (() => void) | null;

    constructor(props: Props) {
        super(props);
        this.state = {
            camera: null,
            url: null,
        };
    }

    public async componentDidMount() {
        let cameraId = this.props.cameraId;
        let camera: Camera = getCamera(cameraId);
        this.setState({ camera });
        this.cancelStream = camera.stream((error, url) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({ url: url || null });
            }
        });
    }

    public componentWillUnmount() {
        if (this.cancelStream) {
            this.cancelStream();
            this.cancelStream = null;
        }
    }

    private get isLoading(): boolean {
        return this.state.url === null;
    }

    public render() {
        return (
            <Widget
                loading={this.isLoading}
                dragContent={true}
                title={<div>
                    <Icon type="camera" style={{ marginTop: 2, marginRight: 12 }} />
                    {this.state.camera && this.state.camera.title}
                </div>}
                onClose={this.props.onClose}
                padding={0}
                foreground="black"
                background="black"
                border="black">
                <DeflickerBackground
                    url={this.state.url}
                />
            </Widget>
        );
    }
}