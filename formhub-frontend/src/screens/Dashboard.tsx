import { gql, useQuery } from "@apollo/client";
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

  return <div>{JSON.stringify(data)}</div>;
};
export default Dashboard;
