import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Table = styled(DataTable)`
  ${compose(space, position, layout, typography)}
  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: var(--tertiary);
    border-color: var(--tertiary);
  }
  .p-datatable-thead > tr > th {
    background: var(--tertiary);
  }
`;
