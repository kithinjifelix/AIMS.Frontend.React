import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import NewProjectForm from "./NewProjectForm";
import { useParams } from "react-router-dom";
import GeoFocus from "./GeoFocus";
import { useQuery } from "@tanstack/react-query";
import { getLookupMasterItemsByName } from "../../../api/lookup";
import ProjectObjectives from "./ProjectObjectives";
import ThematicFocus from "./ThematicFocus";
import ResultsFramework from "./ResultsFramework";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const DesignProject = () => {
  const [value, setValue] = React.useState(0);
  let processLevelTypeId;
  let { id } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { isLoading: isLoadingProcessLevelType, data: processLevelData } =
    useQuery(
      ["processLevelType", "ProcessLevelType"],
      getLookupMasterItemsByName,
      {
        refetchOnWindowFocus: false,
      }
    );
  if (!isLoadingProcessLevelType) {
    const projectProcessLevel = processLevelData.data.filter(
      (obj) => obj.lookupItemName === "Project"
    );
    if (projectProcessLevel.length > 0) {
      processLevelTypeId = projectProcessLevel[0].lookupItemId;
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Basic Information" {...a11yProps(0)} />
        <Tab label="Thematic Focus" {...a11yProps(1)} />
        <Tab label="Geographic Focus" {...a11yProps(2)} />
        <Tab label="Objectives" {...a11yProps(3)} />
        <Tab label="Results Framework" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <NewProjectForm id={id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ThematicFocus id={id} processLevelTypeId={processLevelTypeId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GeoFocus id={id} processLevelTypeId={processLevelTypeId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProjectObjectives id={id} processLevelTypeId={processLevelTypeId} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ResultsFramework id={id} processLevelTypeId={processLevelTypeId} />
      </TabPanel>
    </Box>
  );
};

export default DesignProject;
