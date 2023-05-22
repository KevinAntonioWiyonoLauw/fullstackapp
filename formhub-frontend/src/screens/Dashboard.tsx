import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { startCase, uniq } from "lodash";
import React from "react";
import { Query } from "../gql/graphql";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100vw;
`;

const Dashboard: React.FC = () => {
  const { data, error, loading } = useQuery<Query>(
    gql`
      query Submissions {
        submissions {
          id
          submittedAt
          data
        }
      }
    `
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} </div>;

  const { submissions } = data!;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "submittedAt", headerName: "Submitted At", width: 200 },
    ...uniq(submissions.flatMap((s) => Object.keys(s.data))).map((field) => ({
      field,
      headerName: startCase(field),
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.data[field],
    })),
  ];
  return (
    <Container>
      <DataGrid
        rows={submissions}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Container>
  );
};
export default Dashboard;
