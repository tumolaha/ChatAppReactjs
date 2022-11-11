import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { CaretDown, IdentificationBadge } from "phosphor-react";

function HelpSidebar() {
    return (
        <>
            <Stack direction={'column'} spacing={1}>
                <Stack direction={'row'} p={1} width={'100%'}>
                    <Accordion sx={{ width: '100%' }}>
                        <AccordionSummary
                            expandIcon={<CaretDown size={20} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack direction={'row'} alignItems="center">
                                <IdentificationBadge size={15} />
                                <Typography variant="h5">Help</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ width: '100%' }}>
                            <Stack direction={'column'} spacing={2} width="100%">
                                <Stack direction={'column'} width={'100%'}>
                                    <Typography variant="h6" > Develop team</Typography>
                                    <Stack p={1} spacing={1}>
                                        <Typography variant="body1" fontSize={'1.2rem'}>Nguyễn Văn Tú</Typography>
                                        <Typography variant="body1" fontSize={'1.2rem'}>Vũ Trần Thành Công</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction={'column'} width={'100%'}>
                                    <Typography variant="h6"> FAQs</Typography>
                                    
                                </Stack>
                                <Stack direction={'column'}>
                                    <Typography variant="h6">Contact</Typography>
                                    
                                </Stack>
                                <Stack direction={'column'}>
                                    <Typography variant="h6">Terms & Privacy policy</Typography>
                                    
                                </Stack>
                                
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
                {/* <Stack direction={'row'} p={1}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<CaretDown size={20} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Stack> */}
            </Stack>
        </>
    );
}

export default HelpSidebar;
