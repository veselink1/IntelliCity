import * as React from 'react';

type ShapeProps = {
    fill?: string | null,
    strokeColor?: string | number | null,
    strokeWidth?: string | number | null,
    style?: React.CSSProperties,
};

type RectangleProps = ShapeProps & {
    width: string | number,
    height: string | number,
    cornerRadius?: string | number | null,
};

export class Rectangle extends React.Component<RectangleProps, {}> {
    public render() {
        let {
            width,
            height,
            fill,
            strokeColor,
            strokeWidth,
            cornerRadius,
            style
        } = this.props;
        return (
            <div style={{
                width: width, 
                height: height,
                background: fill,
                borderWidth: strokeWidth,
                borderColor: strokeColor,
                borderRadius: cornerRadius,
                ...style
            }} />
        );
    };
}

type CircleProps = ShapeProps & {
    radius: string | number,
};

export class Circle extends React.Component<CircleProps, {}> {
    public render() {
        let {
            radius,
            fill,
            strokeColor,
            strokeWidth,
            style
        } = this.props;
        return (
            <Rectangle
                width={radius}
                height={radius}
                cornerRadius={radius}
                fill={fill}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                style={style}
            />
        );
    }
}