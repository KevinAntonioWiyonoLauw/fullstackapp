import { gql, useQuery } from "@apollo/client";
import Styled from "@emotion/styled";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const Container = Styled.div`
  display: flex;
  height: 100vw;
  width: 100vw;
`;

const Dashboard: React.FC = () => {
  const { data, loading } = useQuery(
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
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "submittedAt", headerName: "Submitted At", width: 200 },
  ];
  return (
    <Container>
      <DataGrid
        rows={data.submissions.map((submission: any) => ({
          id: submission.id,
          submittedAt: submission.submittedAt,
        }))}
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
