import { useEffect, useState } from "react";
import { getIssues } from "../services/issuesService";
import IssueCard from "../components/IssueCard";
import { useNavigate } from "react-router-dom";

function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchIssues() {
      try {
        const data = await getIssues();

        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
      <h1>Community Issues</h1>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
          />
        ))
      )}
    </div>
  );
}

export default IssuesPage;