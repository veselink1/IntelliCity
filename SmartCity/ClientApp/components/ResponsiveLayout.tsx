import * as React from 'react';

function throttleFrame<TSelf>(
    action: (this: TSelf, ...args: any[]) => void
): (this: TSelf, ...args: any[]) => void {
    let isExecuting = false;
    return function (this: TSelf, ...args: any[]) {
        if (isExecuting) {
            return;
        }
        isExecuting = true;
        requestAnimationFrame(() => {
            try {
                action.call(this, args);
            } finally {
                isExecuting = false;
            }
        });
    };
}

type Rect = {
    width: number,
    height: number,
};

function getViewportSize(view: { innerWidth: number, innerHeight: number }): Rect {
    return { width: view.innerWidth, height: view.innerHeight };
}

function waitContentDocumentInit(object: HTMLObjectElement): Promise<void> {
    return new Promise(resolve => {
        let hasLoaded = false;
        let action = () => {
            if (object.contentDocument) {
                hasLoaded = true;
                resolve();
            } else {
                requestAnimationFrame(action);
            }
        };
        action();
    });
}

const getObjectView = (object: HTMLObjectElement) => object.contentDocument.defaultView;

export class ResizeNotifier extends React.Component<{ onResize: (size: Rect) => void }, {}> {

    private object: HTMLObjectElement | null = null;

    private onRef = async (object: HTMLObjectElement) => {
        if (this.object) {
            getObjectView(this.object).removeEventListener('resize', this.onResize);
        }
        this.object = object;

        if (object) {
            await waitContentDocumentInit(this.object);
            this.onResize();
            getObjectView(this.object as HTMLObjectElement).addEventListener('resize', this.onResize);
        }
    };

    private onResize = throttleFrame<ResizeNotifier>(() => {
        if (this.object) {
            let view = getObjectView(this.object);
            let viewport = getViewportSize(view);
            this.props.onResize(viewport);
        }
    });

    public render() {
        return (
            <object
                ref={this.onRef}
                data="about:blank"
                style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    zIndex: -1,
                }}
            />
        );
    }

}

type Render<P> = (props: P & { viewport: Rect }) => React.ReactNode;

type Trigger<P> = {
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number,
    isDefault?: boolean,
    render: Render<P>,
};

type Props<P> = {
    triggers: Trigger<P>[],
    depends?: any,
};

type State<P> = {
    viewport: Rect,
    prevRenderer: Render<P> | null,
};

/**
 * The ResponsiveLayout Component.
 * Example: 
 * <ResponsiveLayout
 *   triggers={[{
 *     isDefault: true,
 *     render: () => <div> Standard Layout </div>
 *   }, {
 *     minWidth: 320,
 *     render: () => <div> Large Layout </div>
 *   }]} 
 * />
 */
export default class ResponsiveLayout<P> extends React.Component<Props<P>, State<P>> {

    state = {
        viewport: { width: 0, height: 0 },
        prevRenderer: null,
    };

    public shouldComponentUpdate(nextProps: Props<P>, nextState: State<P>): boolean {
        let render = this.getRenderer(nextProps, nextState);
        if (render != this.state.prevRenderer) {
            this.setState({ prevRenderer: render });
            return true;
        }
        if (nextProps.depends != this.props.depends) {
            return true;
        }
        return false;
    }

    private onContainerResize = (viewport: Rect) => {
        this.setState({ viewport });
    };

    private getRenderer(props: Props<P> = this.props, state: State<P> = this.state): Render<P> {
        let resultTrigger: Trigger<P> | null = null;

        let defaultTriggers = props.triggers.filter(trigger => trigger.isDefault);
        if (defaultTriggers.length > 1) {
            throw new Error('Multiple default triggers found!');
        } else if (defaultTriggers.length == 0) {
            throw new Error('No default triggers found!');
        }

        for (let trigger of props.triggers) {
            let {
                width,
                height
            } = state.viewport;

            let {
                isDefault,
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
            } = trigger;

            if (!isDefault
                && (minWidth == null || width >= minWidth)
                && (maxWidth == null || width <= maxWidth)
                && (minHeight == null || height >= minHeight)
                && (maxHeight == null || height <= maxHeight)) {
                if (resultTrigger) {
                    throw new Error('Multiple applicable triggers found!');
                }
                resultTrigger = trigger;
            }
        }

        if (!resultTrigger) {
            resultTrigger = defaultTriggers[0];
        }

        return resultTrigger.render;
    }

    public render() {
        const {
            triggers,
            ...rest
        } = this.props;

        let render = this.getRenderer();

        let content: React.ReactNode = render({
            viewport: this.state.viewport,
            ...(rest as any)
        });

        return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <ResizeNotifier onResize={this.onContainerResize} />
                {content}
            </div>
        );
    }
}