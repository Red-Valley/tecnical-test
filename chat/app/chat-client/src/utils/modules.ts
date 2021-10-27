declare module "@mui/material/styles" {
  interface Theme {
    spread?: {
      form: {
        textAlign: any;
      };
      image: {
        margin: any;
      };
      pageTitle: {
        margin: any;
      };
      textField: {
        margin: any;
      };
      buttom: {
        marginTop: any;
        position: any;
      };
      customError: {
        color: any;
        fontSize: any;
        marginTop: any;
      };
      progress: {
        position: any;
      };
    };
  }
  interface ThemeOptions {
    spread?: {
      form?: {
        textAlign?: string;
      };
      image?: {
        margin?: any;
      };
      pageTitle?: {
        margin?: any;
      };
      textField?: {
        margin?: any;
      };
      buttom?: {
        marginTop?: any;
        position?: any;
      };
      customError?: {
        color?: any;
        fontSize?: any;
        marginTop?: any;
      };
      progress?: {
        position?: any;
      };
    };
  }
}

export {};
