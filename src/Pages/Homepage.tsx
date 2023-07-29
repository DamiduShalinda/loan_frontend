import { Box, Button, Grid, Group, Modal} from '@mantine/core';
import HomepageInputs from '../Components/HomePageInputs';
import { useState } from 'react';
import HomepageLoanDetails from '../Components/HomepageLoanDetails';
import { useDisclosure } from '@mantine/hooks';
import PaymentInputs from '../Components/PaymentInputs';




function Homepage() {

  const [loanID , setLoanID] = useState<number>()
  const [opened, { open, close }] = useDisclosure(false);
  
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
          <HomepageInputs onSubmit={handleSubmit} onClickPayment={open}/>
      </Grid.Col>
    </Grid>
    {loanID && 
    <Modal opened={opened} onClose={close} title="Make a Payment" >
        <PaymentInputs id={loanID} onsubmit={() => close}/>
      </Modal>}
    </>
  )
}

export default Homepage