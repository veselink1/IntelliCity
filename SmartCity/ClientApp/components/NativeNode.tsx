import * as React from 'react';

export function parseHTML(html: string): HTMLElement | null {
    let container = document.createElement('div');
    container.innerHTML = html;
    let elements = container.getElementsByTagName('*');
    return (elements[0] || null) as HTMLElement | null;
}

export default class NativeNode extends React.Component<{ node: Node }, {}> {
    private node: Node | null = null;
    public componentDidMount() {
        this.node!.parentNode!.replaceChild(this.props.node, this.node!);
        this.node = this.props.node;
    }
    public componentWillReceiveProps(nextProps: { node: Node }) {
        if (this.props.node !== nextProps.node) {
            this.node!.parentNode!.replaceChild(nextProps.node, this.node!);
            this.node = nextProps.node;
        }
    }
    public render() {
        return <div ref={element => this.node = element} />;
    }
}