import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssueById, deleteIssue } from "../services/issuesService";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/NavBar";

function IssueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  async function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteIssue(id);

    alert("Issue deleted");

    navigate("/");
  } catch (err) {
    console.error(err);
  }
}

  return (
    <div>
      <Navbar />
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
    <button onClick={handleDelete}>
  Delete
</button>
    </div>
  );
}

export default IssueDetailPage;