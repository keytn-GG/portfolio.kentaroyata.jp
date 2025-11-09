// dependensies
import { Icon, type IconProps } from '@iconify/react';

// types
type IconBaseProps = Omit<IconProps, 'icon'>;

export function ArrowUp(props: IconBaseProps) {
    return <Icon icon="material-symbols:keyboard-arrow-up" width="24" height="24" {...props} />;
}

export function PrevIcon(props: IconBaseProps) {
    return <Icon icon="material-symbols:arrow-back-ios-new" width="24" height="24" {...props} />;
}

export function NextIcon(props: IconBaseProps) {
    return <Icon icon="material-symbols:arrow-forward-ios" width="24" height="24" {...props} />;
}