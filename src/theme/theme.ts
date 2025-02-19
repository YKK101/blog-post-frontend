import { createTheme } from "@mui/material";
import { COLOR } from "./color";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: COLOR.GREY_100,
            main: COLOR.GREEN_300,
            dark: COLOR.GREEN_500,
        },
        secondary: {
            light: COLOR.BLUE_100,
            main: COLOR.BLUE_300,
            dark: COLOR.BLUE_500,
        },
        success: {
            main: COLOR.LEAF_GREEN,
        },
        grey: {
            100: COLOR.GREY_100,
            300: COLOR.GREY_300,
        },
        text: {
            primary: COLOR.CHARCOAL,
        },
        background: {
            paper: COLOR.WHITE,
            default: COLOR.GREEN_100,
        }
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: '"Inter", serif',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: COLOR.GREEN_500,
                    zIndex: 0,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                color: 'success',
            },
            styleOverrides: {
                root: {
                    fontFamily: '"IBM Plex Sans Thai", serif',
                },
                sizeMedium: {
                    height: 44,
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: COLOR.GREEN_500,
                }
            }
        },
        MuiInput: {
            defaultProps: {
                disableUnderline: true,
            },
            styleOverrides: {
                root: {
                    minHeight: 44,
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 8,
                    padding: '0px 8px',
                    fontFamily: '"IBM Plex Sans Thai", serif',
                    '&.Mui-focused': {
                        border: `2px solid ${COLOR.GOLDEN}`,
                        boxShadow: `0px 0px 5px 0px ${COLOR.GOLDEN}CC`,
                    },
                    '&.Mui-error': {
                        border: `2px solid ${COLOR.DANGER}`,
                    }
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: COLOR.WHITE,
                },
                arrow: {
                    color: COLOR.WHITE,
                }
            }
        }
    },
});
