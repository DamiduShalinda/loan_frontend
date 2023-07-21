import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Button,
  Grid,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  id : string;
  loan_id : string;
  monthly_payment : string;
  monthly_arrears : string;
  arr_cal_date : string;
}

interface TableSortProps {
  data: RowData[];
  onSubmitCalculate: () => void;
  onClickMore: (id: string) => void;
  onClickAdd: () => void;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableAllLoanArrears({ data , onSubmitCalculate , onClickMore , onClickAdd}: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{row.loan_id}</td>
      <td>{row.monthly_payment}</td>
      <td>{row.arr_cal_date}</td>
      <td>{row.monthly_arrears}</td>
      <td><Button variant='subtle' onClick={ () => onClickMore(row.loan_id)}>More</Button></td>
    </tr>
  ));

  //TODO: add a  burger and drawer
  return (
    <>
      <Grid>
        <Grid.Col span={10}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        </Grid.Col>
        <Grid.Col span={1}>
          <Button variant='light' onClick={() => onSubmitCalculate() }>Calculate</Button>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button variant='light' onClick={() => onClickAdd() }>Add</Button>
        </Grid.Col>
      </Grid>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'loan_id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('loan_id')}
            >
              Loan Number
            </Th>
            <Th
              sorted={sortBy === 'monthly_payment'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('monthly_payment')}
            >
              Monthly Payment
            </Th>
            <Th
              sorted={sortBy === 'arr_cal_date'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('arr_cal_date')}
            >
              Arrears Calculation Date
            </Th>
            <Th
              sorted={sortBy === 'monthly_arrears'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('monthly_arrears')}
            >
              Monthly Arrears
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}