
import { Link } from "react-router-dom";

  
function IssueCard({ issue }) {
  return (

    <div className="issue-card">
      <Link to={`/issues/${issue.id}`}>
      <h3>{issue.title}</h3>

      {/* <p>{issue.description}</p>

      <p>
        <strong>Category:</strong> {issue.category}
      </p>

      <p>
        <strong>Status:</strong> {issue.status}
      </p> */}
    </Link>
    <p>{issue.category}</p>
    </div>
  );
}

export default IssueCard;