import { Box } from "@mui/material"

import { mainContentContainer, mainTemplayeStyle } from "./MainTemplateStyle"
import { MenuProvider } from "../../../context/Menu/MenuContext"
import { MainTemplateProps } from "./Type";

function MainTemplate({ header, menu, mainContent }: MainTemplateProps) {
    return (
        <MenuProvider>
            <Box sx={mainTemplayeStyle}>
                <Box component="header">
                    {header}
                </Box>
                
                    {menu}
                
                <Box sx={mainContentContainer}>
                    {mainContent}
                </Box>

            </Box>
        </MenuProvider>
    );
}

export default MainTemplate;
