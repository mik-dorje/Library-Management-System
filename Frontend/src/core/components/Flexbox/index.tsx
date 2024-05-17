import styled, { css } from "styled-components";

interface Props {
    inline?: boolean;
    align?: "center" | "flex-start" | "flex-end" | "unset";
    direction?:
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        | "initial"
        | "unset";
    justify?:
        | "center"
        | "flex-start"
        | "flex-end"
        | "unset"
        | "space-between"
        | "space-around"
        | "space-evenly";
    className?: string;
    flexWrap?: "wrap" | "nowrap";
    flexGrow?: string;
}

const alignStyles = css<Props>`
    align-items: ${(props) => props.align};
`;

const directionStyles = css<Props>`
    flex-direction: ${(props) => props.direction};
`;

const justifyStyles = css<Props>`
    justify-content: ${(props) => props.justify};
`;

const flexWrapStyles = css<Props>`
    flex-wrap: ${(props) => props.flexWrap};
`;
const flexGrowStyles = css<Props>`
    flex-grow: ${(props) => props.flexGrow};
`;

const Flexbox = styled.div<Props>`
    display: ${(props) => (props.inline ? "inline-flex" : "flex")};
    ${(props) => props.align && alignStyles}
    ${(props) => props.direction && directionStyles}
    ${(props) => props.justify && justifyStyles}
    ${(props) => props.flexWrap && flexWrapStyles}
    ${(props) => props.flexGrow && flexGrowStyles}
`;

Flexbox.defaultProps = {
    inline: false,
    align: "flex-start",
    direction: "row",
    justify: "unset",
};

export default Flexbox;
