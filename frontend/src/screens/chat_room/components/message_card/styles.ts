import { globalStyles } from "utils/styles";

export const styles = {
    messageCardPaper: {
        padding: "5px 10px"
    },
    messageCardDate: {
        ...globalStyles.flexRow,
        justifyContent: "flex-end",
        fontSize: ".6rem",
    }
}