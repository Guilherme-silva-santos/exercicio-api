export interface theme {
  colors: {
    background: string;
    text: string;
    button: string;
    icons: string;
  };
}

export const lightTheme: theme = {
  colors: {
    background: "#FFFFFF",
    text: "#000000",
    button: "#e3e3e3",
    icons: "#000000",
  },
};

export const darkTheme: theme = {
  colors: {
    background: "#808080",
    text: "#FFFFFF",
    button: "#000000",
    icons: "#FFFFFF",
  },
};
