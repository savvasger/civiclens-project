import { useEffect } from "react";
import api from "../../services/api";

function IssuesPage() {
  useEffect(() => {
  async function fetchIssues() {
    const response = await api.get("/issues");
    console.log(response.data);
  }
  console.log("Issue page mounted")

  fetchIssues();
}, []);

  return <h1>Issues</h1>;
}

export default IssuesPage;