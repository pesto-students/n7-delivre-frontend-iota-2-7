import React from "react";
import { Container } from "./Container";
import { Div } from "./Div";
import FilterButtons from "./FilterButtons";
import { Heading } from "./Heading";
import { NavBar } from "./Navbar";
import { Section } from "./Section";
import { Table } from "./Table";

const List = ({title, globalFilter, setGlobalFilter, textButtons, setFilterOption, getTableValue, dynamicColumns}) => {
  return (
    <Section>
      <NavBar
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <Container>
        <Div m="auto">
          <Heading size="big" weight="hairline" mt={40} mb={40}>
            {title}
          </Heading>

          <FilterButtons textButtons={textButtons} handler={setFilterOption} />

          <Div mt={40} borderRadius={5} shadow>
            <Table
              width="auto"
              value={getTableValue()}
              paginator
              rows={5}
              rowHover
              resizableColumns
              columnResizeMode="expand"
              sortMode="multiple"
              globalFilter={globalFilter}
              emptyMessage="No data found."
            >
              {dynamicColumns()}
            </Table>
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

export default List;
