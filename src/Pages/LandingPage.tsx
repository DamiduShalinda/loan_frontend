import { createStyles, Overlay, Container, Title, Button, Text, rem  , Flex  , Anchor} from '@mantine/core';
import { LogInField } from '../Components/LogInField';
import AuthContext from '../Context/AuthContext'
import { useContext} from 'react';

const useStyles = createStyles((theme) => ({

  
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: rem(502),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.xs,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

export type formData = {
  username: string;
  password: string;
};

export function LandingPage() {
  const { classes } = useStyles();
  const  {contextData}  = useContext(AuthContext)

  const handlesubmit = (data:formData ) => {
    
    contextData.loginUser(data)
  }

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      
        <Flex direction={'row'} gap={'lg'} align={'baseline'}>
      <Container className={classes.container}>
        <Title className={classes.title}>Hasaru Enterprices</Title>
        <Text className={classes.description}  mt="xl">
         With a strong presence and four branches conveniently located, we aim to make motorcycle ownership accessible and affordable for everyone. At Hasaru Enterprises, we understand the joy and freedom that comes with owning a motorcycle. Our mission is to empower individuals to fulfill their dreams of hitting the road on two wheels
        </Text>

        <Anchor href="/loancalculator">
        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Loan Calculator
        </Button>
        </Anchor>
      </Container>
        <LogInField onSubmit={handlesubmit}/>
      </Flex>
    </div>
  );
}