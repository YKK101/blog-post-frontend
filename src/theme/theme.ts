import { createTheme } from "@mui/material";
import { COLOR } from "./color";
import { APPBAR_HEIGHT } from "@/constants/constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        },
        divider: COLOR.GREEN_100,
    },
    shape: {
        borderRadius: 10,
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
                    height: APPBAR_HEIGHT,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                color: 'success',
                variant: 'contained',
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
        MuiContainer: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
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
                    fontFamily: '"IBM Plex Sans Thai", serif',
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: 'standard',
                IconComponent: ExpandMoreIcon,
            },
            styleOverrides: {
                root: {
                    fontFamily: '"IBM Plex Sans Thai", serif',
                    height: 44,
                },
            }
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
