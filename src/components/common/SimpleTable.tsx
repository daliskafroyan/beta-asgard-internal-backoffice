import { useState } from 'react';
import { createStyles, ScrollArea, Table } from '@mantine/core';
import { nanoid } from 'nanoid';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function SimpleTable({
  rowHeader,
  rowData,
}: {
  rowHeader: JSX.Element;
  rowData: JSX.Element[];
}) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // const rowHeadewr = [].map((row) => (
  //   <tr key={nanoid()}>
  //     <td>{row.name}</td>
  //     <td>{row.email}</td>
  //     <td>{row.company}</td>
  //   </tr>
  // ));

  // // const rowData = data.map((row) => (
  // //   <tr key=nanoid()>
  // //     <td>{row.name}</td>
  // //     <td>{row.email}</td>
  // //     <td>{row.company}</td>
  // //   </tr>
  // // ));

  // const rawsData = (
  //   <tr>
  //     {rawrData.map((rawr) => (
  //       <td key={nanoid()}>{rawr}</td>
  //     ))}
  //   </tr>
  // );
  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }} withBorder highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          {rowHeader}
        </thead>
        <tbody>{rowData}</tbody>
      </Table>
    </ScrollArea>
  );
}
