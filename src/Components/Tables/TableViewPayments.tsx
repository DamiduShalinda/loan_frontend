import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem, Center } from '@mantine/core';
import { formValues } from '../LoanPayments';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { id : number , payment_amount : number , payment_date : string , interest : number , principle  : number , balance : number  }[];
}

export function TableViewPayments({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.payment_amount}</td>
      <td>{row.payment_date}</td>
      <td>{row.interest}</td>
      <td>{row.principle}</td>
      <td>{row.balance}</td>
    </tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Center>
      <Table maw={1100} withColumnBorders>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Payment Amount</th>
            <th>Payment Date</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      </Center>
    </ScrollArea>
  );
}