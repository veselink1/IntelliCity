import * as React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    user-select: none;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;

    &:hover .close-button {
        color: black;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
`;

const CloseButton = styled.div`
    position: absolute;
    top: 12px;
    right: 16px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    font-size: 16px;
    text-shadow: none;
    color: transparent;
    transition: 0.1s all linear;
`;

type Overflow = "hidden" | "initial" | "inherit" | "unset" | "auto" | "scroll" | "visible";

export interface WidgetProps {
    title: React.ReactNode | null,
    children: React.ReactNode,
    overflow?: Overflow,
    preview?: boolean,
    padding: string | number,
    background: string,
    foreground: string,
    border: string,
    dragContent?: boolean,
    loading?: boolean,
    onClose: () => void;
};

export default class Widget extends React.Component<WidgetProps, {}> {

    private handleCloseClicked = () => {
        this.props.onClose();
    };

    public render() {
        const {
            title,
            children,
            overflow,
            padding,
            background,
            foreground,
            border,
            dragContent,
            loading,
            preview,
            onClose,
            ...rest
        } = this.props;

        let bodyStyles = overflow
            ? { overflow }
            : { overflowX: 'hidden', overflowY: 'auto' };

        return (
            <Container
                style={{
                    borderWidth: 0,
                    borderStyle: 'solid',
                    borderColor: border
                }}
                {...rest}>
                <Card
                    loading={loading === true}
                    title={title}
                    bordered={false}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    bodyStyle={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: background,
                        color: foreground,
                        padding: title ? '0 0 46px 0' : '0',
                    }}>
                    {!preview &&
                        <CloseButton 
                            className="close-button"
                            onClick={this.handleCloseClicked}>
                            <Icon type="close-circle" />
                        </CloseButton>
                    }
                    <div
                        onMouseDown={event => !dragContent && event.stopPropagation()}
                        onTouchStart={event => !dragContent && event.stopPropagation()}
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: padding,
                            ...(bodyStyles as any)
                        }}>
                        {children}
                    </div>
                </Card>
            </Container>
        );
    }
}