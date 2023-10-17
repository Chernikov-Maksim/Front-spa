import { forwardRef } from "react";
import { Scrollbar, ScrollbarProps } from "react-scrollbars-custom";

// eslint-disable-next-line react/display-name
const CustomScrollbarAdapter = forwardRef<ScrollbarProps, any>((props, ref) => {
    const { children, ownerState, ...rest } = props;

    return (
        <div {...rest} ref={ref}>
            <Scrollbar
                style={{
                    height: `${
                        ((children[0].length * (44 + 8) ||
                            (children[2] ? 332 : 0)) +
                            8) /
                        10
                    }rem`,
                }}
                noDefaultStyles
                disableTracksWidthCompensation
            >
                {children}
            </Scrollbar>
        </div>
    );
});

export { CustomScrollbarAdapter };
