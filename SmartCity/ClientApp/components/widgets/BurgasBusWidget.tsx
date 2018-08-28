import * as React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import mdPalette from '../../utils/md-palette';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    .full-map {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-image: url('http://burgasbus.info/burgasbus/wp-content/uploads/2017/02/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BD%D0%B0-%D1%81%D1%85%D0%B5%D0%BC%D0%B0-24.02.2017-%D0%B3.png');
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: 0.2s background-color ease-in-out;
    }

    .overlay:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .view-btn {
        position: absolute;
        top: calc(50% - 64px);
        left: calc(50% - 32px);
        width: 64px;
        height: 64px;
        font-size: 64px;
        transition: 0.2s all ease-in-out;
        color: transparent;
        text-shadow: none;
    }

    .overlay:hover .view-btn {
        color: white;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
`;

export default class BurgasBusWidget extends React.Component<{ onClose: () => void }, {}> {

    private handleClicked = () => {
        window.open('http://burgasbus.info/burgasbus/wp-content/uploads/2017/02/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BD%D0%B0-%D1%81%D1%85%D0%B5%D0%BC%D0%B0-24.02.2017-%D0%B3.png', '_blank');
    };

    public render() {
        return (
            <Widget
                title={<div><Icon type="car" style={{ marginRight: 10 }} />Транспорт</div>}
                onClose={this.props.onClose}
                padding={0}
                foreground="black"
                background={mdPalette.get('Amber', '50')}
                border={mdPalette.get('Amber', '50')}>
                <Container>
                    <div className="full-map" />
                    <div className="overlay">
                        <div className="view-btn" onClick={this.handleClicked}><Icon type="arrows-alt" /></div>
                    </div>
                </Container>
            </Widget>
        );
    }
}