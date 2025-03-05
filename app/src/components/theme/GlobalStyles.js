import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.2s linear;
    }
`;
