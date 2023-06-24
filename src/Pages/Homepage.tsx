import { Box, Grid} from '@mantine/core';
import HomepageInputs from '../Components/HomePageInputs';
import { useState } from 'react';
import HomepageLoanDetails from '../Components/HomepageLoanDetails';




function Homepage() {

  const [loanID , setLoanID] = useState<number>()
  function handleSubmit(id: number) {
    setLoanID(id)
  }
 

  return (
    <>
    <Grid>
      <Grid.Col span={6}>
        {loanID && <HomepageLoanDetails id={loanID}/>}
      </Grid.Col>
      <Grid.Col span={6}>
        <Box
         sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          border: theme.colorScheme === 'dark' ? `1px solid ${theme.colors.gray[7]}` : `1px solid ${theme.colors.gray[3]}`,
          width: '80%',
          height: '80vh',
          margin: 'auto',
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          },
        })}
        >
          <HomepageInputs onSubmit={handleSubmit}/>
        </Box>
      </Grid.Col>
    </Grid>
    </>
  )
}

export default Homepage