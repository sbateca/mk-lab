import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import Reports from "../reports/reports"
import Samples from "../samples/Samples"
import { contentStyle } from "./ContentStyle"

function Content() {
  return (
    <Box sx={contentStyle}>
      <Routes>
          <Route path="/" element={<Samples />} />
          <Route path="/samples" element={<Samples />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      
    </Box>
  );
}

export default Content;
