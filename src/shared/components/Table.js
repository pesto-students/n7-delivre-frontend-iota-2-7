import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Table = styled(DataTable).attrs({
  className: "p-datatable-responsive-demo",
})`
  ${compose(space, position, layout, typography)}
  .p-datatable-tbody > tr > td .p-column-title {
    display: none;
  }

  @media screen and (max-width: 40em) {
    &.p-datatable-responsive-demo {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        border: 0 none;
        width: 100% !important;
        float: left;
        clear: left;

        .p-column-title {
          padding: 0.4rem;
          min-width: 30%;
          display: inline-block;
          margin: -0.4em 1em -0.4em -0.4rem;
          font-weight: bold;
        }
      }
      .p-datatable-tbody > tr > td:last-child {
        .p-button{
          width:100%;
        }
        border-bottom: 1px solid var(--secondary);
      }
    }
  }
  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: var(--tertiary);
    border-color: var(--tertiary);
  }
  .p-datatable-thead > tr > th {
    background: var(--white);
  }
`;
