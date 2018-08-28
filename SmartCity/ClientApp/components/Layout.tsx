import * as React from 'react';
import styled from 'styled-components';
import mdPalette from '../utils/md-palette';

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: ${mdPalette.get('Grey', '100')};
    background-image: url('/img/small_steps.png');
`;

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
    }
}
