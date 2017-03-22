export const AppBarHeight = 65;
export const FooterHeight = 40;
export const RoomCellSize = 35;

export const Colors = {
    primary: "#8bc34a",
    lightPrimary: "#dcedc8",
    secondary: "#795548",
    white: "#ffffff",
    black: "#212121",
    lightGray: "#bdbdbd",
    darkGray: "#757575",
    accent: "#dcedc8"
};

export const AppStyles = {
    AppBar: {
        style: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            height: AppBarHeight,
            textAlign: 'center',
            color: Colors.white,
            backgroundColor: Colors.primary,
            borderBottom: '1px solid ' + Colors.lightPrimary
        } as React.CSSProperties,
        center: {

        } as React.CSSProperties,
        titleSquare: {
            width: 'auto',
            height: 40,
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
            border: '2px solid ' + Colors.white,
            padding: '0px 5px 0px 5px'
        } as React.CSSProperties,

        titleSquareSpan: {
            alignSelf: 'center',
            fontWeight: 'bold',
        } as React.CSSProperties,
    },
    Footer: {
        style: {
            backgroundColor: Colors.lightPrimary,
            borderTop: '1px solid ' + Colors.primary
        } as React.CSSProperties
    },
    Grid: {
    }
}