import { useParams } from "react-router-dom"
import ArrearsCard from "./ArrearsCard";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Button, Center, createStyles } from "@mantine/core";


type ParamsProps = {
    id: string;
    date : string
}

const useStyles = createStyles((theme) => ({
    
  background : {
    backgroundColor : theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    width : '100%',
    height : '100vh',
  },

  }))

function ArrearsCardPrint() {

    const { id , date } = useParams<ParamsProps>();
    const componentRef = useRef<HTMLDivElement | null>(null);
    const { classes } = useStyles();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    
  return (
   <div className={classes.background}>
   { id && date ? 
        <div>
           <Center><Button onClick={handlePrint} my={"xl"}>Print</Button></Center>
           
          <div ref={componentRef}>
            <ArrearsCard id={parseInt(id)} date={date}/>
          </div>
        </div> :
        <div>error</div>}
   </div>
    
  );
}

export default ArrearsCardPrint