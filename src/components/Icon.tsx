// dependensies
import { Icon, type IconProps } from '@iconify/react';

type IconBaseProps = Omit<IconProps, 'icon'>;

export function ArrowUp(props: IconBaseProps) {
    return <Icon icon="material-symbols:keyboard-arrow-up" width="24" height="24" {...props} />;
}
