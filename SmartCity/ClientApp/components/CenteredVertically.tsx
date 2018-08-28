import * as React from 'react';
import styled from 'styled-components';

const Parent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Child = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0%, -50%);
`;

export default class CenteredVertically extends React.Component<React.HTMLProps<{}>, {}> {
    public render() {
        const {
            children,
            ...rest
        } = this.props;
        return (
            <Parent {...this.props}>
                <Child children={children} />
            </Parent>
        );
    }
}