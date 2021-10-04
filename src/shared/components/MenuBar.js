import { Menubar as DMenuBar } from 'primereact/menubar';
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const MenuBar = styled(DMenuBar)`
    ${compose(space, position, layout, typography)}
    background: var(--tertiary);
    border: none;
    border-radius: none;
    .p-menubar-root-list > .p-menuitem > .p-menuitem-link{
        font-size: var(--medium)
    }
`
