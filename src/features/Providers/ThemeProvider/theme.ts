import { extendTheme } from "@mui/joy/styles";

import { CustomScrollbarAdapter } from "@/features/CustomScrollbarAdapter/ui";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                common: {
                    white: "#FFFFFF",
                },
                text: {
                    icon: "#D9D9D9",
                },
                neutral: {
                    outlinedColor: "#3E4550",
                    plainActiveBg: "#F2F2F2",
                    plainHoverBg: "#F2F2F2",
                },
                background: {
                    body: "#FFFFFF",
                },
            },
        },
    },
    components: {
        JoyScopedCssBaseline: {
            styleOverrides: {
                root: {
                    margin: "inherit",
                },
            },
        },
        JoySvgIcon: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    "--Icon-fontSize": "2.4rem",
                }),
            },
        },
        JoyInput: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    "--Input-minHeight": "7.2rem",
                    "--Input-paddingInline": "1.6rem",
                    "--Input-placeholderColor": "#A6A6A6",
                    "--Input-placeholderOpacity": "1",
                    "--Input-focusedHighlight": "transparent",
                    border: "0",
                }),
            },
        },
        JoyAutocomplete: {
            defaultProps: {
                slotProps: {
                    listbox: {
                        component: CustomScrollbarAdapter,
                    },
                },
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    "--Input-minHeight": "7.2rem",
                    "--Input-paddingInline": "1.6rem",
                    "--Input-placeholderColor": "#A6A6A6",
                    "--Input-placeholderOpacity": "1",
                    "--Input-focusedHighlight": "transparent",
                    border: "0",
                }),
                listbox: ({ ownerState, theme }) => ({
                    border: "0",
                    "--ListItem-paddingY": "1rem",
                    "--ListItem-paddingX": "2.4rem",
                    boxShadow: "0.2rem 0.5rem 1.4rem 0 rgba(38, 38, 38, 0.07)",
                    maxHeight: "34.4rem",
                    padding: "0",
                    ".ScrollbarsCustom": {
                        "&:hover": {
                            ".ScrollbarsCustom-Track": {
                                opacity: "1",
                            },
                        },
                    },
                    ".ScrollbarsCustom-Wrapper": {
                        inset: "0 0 0 0",
                    },
                    ".ScrollbarsCustom-Track": {
                        position: "absolute",
                        opacity: "0",
                    },
                    ".ScrollbarsCustom-TrackY": {
                        right: "4px",
                        top: "12px",
                        bottom: "12px",
                        width: "3px",
                    },
                    ".ScrollbarsCustom-Thumb": {
                        cursor: "pointer",
                        borderRadius: "100rem",
                        width: "100%",
                        backgroundColor: "#DADADA",
                    },
                }),
                clearIndicator: ({ ownerState, theme }) => ({
                    color: "#D9D9D9",
                    minHeight: "auto",
                    minWidth: "auto",
                    paddingInline: "0",
                    "--IconButton-radius": "0.4rem",
                    "&:hover": {
                        backgroundColor: "#F2F2F2",
                        color: "#3E4550",
                    },
                }),
            },
        },
        JoyAutocompleteOption: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    marginBottom: "0.8rem",
                    border: "0",
                    fontSize: theme.fontSize.md,
                    lineHeight: "normal",
                    svg: {
                        opacity: "0",
                    },
                    "&:first-child": {
                        marginTop: "0.8rem",
                    },
                    "&[aria-selected='true']": {
                        fontWeight: "inherit",
                        position: "relative",
                        svg: {
                            opacity: "1",
                        },
                        "&::before": {
                            content: "''",
                            position: "absolute",
                            pointerEvents: "none",
                            left: "0.2rem",
                            top: 0,
                            bottom: 0,
                            right: 0,
                            boxShadow: "-0.2rem 0 0 0 #3E4550",
                        },
                    },
                }),
            },
        },
        JoySelect: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    "--Select-minHeight": "7.2rem",
                    "--Select-paddingInline": "1.6rem",
                    "--Select-placeholderOpacity": "1",
                    "--Select-focusedHighlight": "transparent",
                    border: "0",
                    "&:hover": {
                        backgroundColor: theme.vars.palette.background.body,
                    },
                }),
                listbox: ({ ownerState, theme }) => ({
                    border: "0.1rem solid #DADADA",
                    paddingBlock: "0.8rem",
                    "--ListItem-paddingY": "1.6rem",
                    "--ListItem-paddingX": "2.4rem",
                    boxShadow: "0.2rem 0.5rem 1.4rem 0 rgba(38, 38, 38, 0.07)",
                }),
                button: ({ ownerState, theme }) => ({
                    ...(!ownerState.value && {
                        color: "#A6A6A6",
                    }),
                }),
            },
        },
        JoyOption: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    marginBottom: "0.8rem",
                    border: "0",
                    fontSize: theme.fontSize.md,
                    lineHeight: "1.2rem",
                    "&:first-child": {
                        marginTop: "0.8rem",
                    },
                    "&:hover": {
                        backgroundColor: "#F2F2F2",
                    },
                    "&.Mui-selected": {
                        backgroundColor: theme.palette.background.body,
                        "&:hover": {
                            backgroundColor: "#F2F2F2",
                        },
                    },
                }),
            },
        },
    },
    radius: {
        sm: "1.2rem",
    },
    fontSize: {
        xs: "1.3rem",
        sm: "1.5rem",
        md: "1.7rem",
        lg: "2rem",
        xl: "2.4rem",
        xl2: "3.4rem",
        xl3: "7.2rem",
    },
    fontFamily: {
        body: "Golos Text, sans-serif",
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
});

export default theme;
