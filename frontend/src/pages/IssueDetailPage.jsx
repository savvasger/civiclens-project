import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssueById } from "../services/issuesService";
import { Link } from "react-router-dom";

function IssueDetailPage() {
  const { id } = useParams();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIssue() {
      try {
        const data = await getIssueById(id);
        setIssue(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssue();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!issue) {
    return <h2>Issue not found</h2>;
  }

  return (
    <div>
      <h1>{issue.title}</h1>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{issue.description}</p>

      <p>
        <strong>Category:</strong> {issue.category}
      </p>

      <p>
        <strong>Status:</strong> {issue.status}
      </p>
    <Link to={`/issues/${issue.id}/edit`}>
      <button>Edit Issue</button>
    </Link>
    </div>
  );
}

export default IssueDetailPage;