import { gql, useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

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
    { field: "id", headerName: "ID" },
    { field: "submittedAt", headerName: "Submitted At" },
  ];
  return (
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
  );
};
export default Dashboard;
