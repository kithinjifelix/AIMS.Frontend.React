import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "@emotion/styled";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Link,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Edit2, Trash } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAdministrativeProgrammes } from "../../api/administrative-programme";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Button = styled(MuiButton)(spacing);

const AdministrativeProgrammesData = () => {
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  // fetch projects
  const { data, isLoading, isError, error } = useQuery(
    ["administrativeProgrammes"],
    getAdministrativeProgrammes,
    {
      retry: 0,
    }
  );

  if (isError) {
    toast(error.response.data, {
      type: "error",
    });
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Button
          mr={2}
          variant="contained"
          color="error"
          onClick={() => navigate("/programme/new-administrative-programme")}
        >
          <AddIcon /> New Administrative Programme
        </Button>
      </CardContent>
      <br />
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={isLoading || isError ? [] : data ? data.data : []}
            columns={[
              {
                field: "longTitle",
                headerName: "Long Title",
                editable: false,
                flex: 1,
              },
              {
                field: "shortTitle",
                headerName: "Short Title",
                editable: false,
                flex: 1,
              },
              {
                field: "organisationUnitId",
                headerName: "Organisation Unit",
                editable: false,
                flex: 1,
              },
              {
                field: "managerName",
                headerName: "Manager Name",
                editable: false,
                flex: 1,
              },
              {
                field: "goal",
                headerName: "Goal",
                editable: false,
                flex: 1,
              },
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                flex: 1,
                renderCell: (params) => (
                  <>
                    <NavLink
                      to={`/programme/new-administrative-programme/${params.id}`}
                    >
                      <Button startIcon={<Edit2 />} size="small"></Button>
                    </NavLink>
                    <NavLink to={`/project/project-detail/${params.id}`}>
                      <Button startIcon={<Trash />} size="small"></Button>
                    </NavLink>
                  </>
                ),
              },
            ]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            loading={isLoading}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Paper>
    </Card>
  );
};

const AdministrativeProgrammes = () => {
  return (
    <React.Fragment>
      <Helmet title="Administrative Programmes" />
      <Typography variant="h3" gutterBottom display="inline">
        Administrative Programmes
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/programme/administrative-programmes">
          Administrative Programmes
        </Link>
        <Typography>Administrative Programmes List</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <AdministrativeProgrammesData />
    </React.Fragment>
  );
};
export default AdministrativeProgrammes;