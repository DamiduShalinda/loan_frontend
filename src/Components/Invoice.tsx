import React from 'react';
import { Paper, Text, Group, Divider, Container, Space, Footer, Stack, Grid } from '@mantine/core';

interface InvoiceProps {
  companyName: string;
  companyAddress: string;
  customerName: string;
  customerAddress: string;
  loanNumber: string;
  payingAmount: number;
  date: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  companyName,
  companyAddress,
  customerName,
  customerAddress,
  loanNumber,
  payingAmount,
  date,
}) => {
  return (
    <Container size="lg">
      <Paper shadow="xs" style={{ padding: 20, marginBottom: 20 }}>
       <Space h="10vh" />
       <Grid>
        <Grid.Col span={12}>
        <Stack spacing={'xs'}>
            <Text size={70} weight={700}>
                INVOICE
            </Text>
            <Text size={15} weight={700}>
                INVOICE NO:
            </Text>
            <Text size="sm" weight={700}>
                 {date}
            </Text>
        </Stack>
        </Grid.Col>
        <Grid.Col span={12}><Space h="2vh" /></Grid.Col>
        <Grid.Col span={12}>
            <Stack spacing={'xs'}>
                <Text size="lg" weight={700}>
                    {companyName}
                </Text>
                <Text size="sm" weight={700}>
                    {companyAddress}
                </Text>
            </Stack>
        </Grid.Col>
        <Grid.Col span={12}><Space h="3vh" /></Grid.Col>
        <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="sm" weight={700}>
                            Loan Number
                        </Text>
                        <Text size="sm" weight={700}>
                            {loanNumber}
                        </Text>
                    </Stack>
                </Grid.Col>
        <Grid.Col span={6}>
            <Group position='right'>
                <Stack spacing={'xs'}>
                    <Text size="lg" weight={700} align='right'>
                        {customerName}
                    </Text>
                    <Text size="sm" weight={700} align='right'>
                        {customerAddress}
                    </Text>
                    <Text size="sm" weight={700} align='right'>
                        damidu@gmail.com
                    </Text>
                </Stack>
            </Group>
        </Grid.Col>
         </Grid>
            <Space h="3vh" />
         <Divider variant="dashed" />
            <Space h="3vh" />
            <Grid>
                
                <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="sm" weight={700}>
                            Paid Amount
                        </Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="right">
                    <Stack spacing={'xs'}>
                        <Text size="sm" weight={700}>
                           LKR {payingAmount.toFixed(2)}
                        </Text>
                    </Stack>
                    </Group>
                </Grid.Col>
            </Grid>
            <Space h="3vh" />
            <Divider variant="dashed" />
            <Space h="3vh" />
            <Grid>
                <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="lg" weight={700}>
                            Thank you for your business
                        </Text>
                        <Space h="1vh" />
                        <Text size="sm" weight={700}>
                            ...............................................
                        </Text>
                        <Text size="sm" weight={700}>
                            Authorized Signature
                        </Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="center">
                    <Stack spacing={'xs'}>
                    <Text size="sm">Branch 1: 123-456-7890</Text>
                    <Text size="sm">Branch 2: 987-654-3210</Text>
                    <Text size="sm">Branch 3: 456-789-0123</Text>
                    <Text size="sm">Branch 4: 789-012-3456</Text>
                    </Stack>
                    </Group>
                </Grid.Col>
            </Grid>
      </Paper>
    </Container>
  );
};

export default Invoice;
