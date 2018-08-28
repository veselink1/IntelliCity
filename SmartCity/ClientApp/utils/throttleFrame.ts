export default function throttleFrame<TSelf>(
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