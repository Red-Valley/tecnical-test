import styled from "@emotion/styled";
import { globalStyles } from "utils/styles";

export const styles = {
    messageCardPaper: {
        padding: "5px 10px"
    },
    messageOwner: {
        backgroundColor: "var(--secondary)",
    },
    messageNoOwner: {
        backgroundColor: "var(--third)",
    },
    messageOwnerText: {
        color: "#fff"
    },
    messageCardDate: {
        ...globalStyles.flexRow,
        justifyContent: "flex-end",
        fontSize: ".6rem",
    }
}

export const GiphyGif = styled.img`
    height: auto;
    max-width: 100%;
    margin: 5px 0;
`;