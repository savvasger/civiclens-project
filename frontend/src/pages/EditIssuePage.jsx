import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getIssueById,
  updateIssue,
} from "../services/issuesService";
import Navbar from "../components/NavBar";

function EditIssuePage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadIssue() {
      const issue = await getIssueById(id);

      setTitle(issue.title);
      setDescription(issue.description);
      setCategory(issue.category);
      setStatus(issue.status);
    }

    loadIssue();
  }, [id]);

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    await updateIssue(id, {
      title,
      description,
      category,
      status,
    });

    alert("Issue updated");
  } catch (err) {
    console.error(err);
  }
}

  return (
   <div>
    <Navbar />
  <h1>Edit Issue</h1>

  <form onSubmit={handleSubmit}>
    <div>
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div>
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />
    </div>

    <div>
      <label>Category</label>
      <input
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />
    </div>

    <div>
      <label>Status</label>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="Open">Open</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="Closed">
          Closed
        </option>
      </select>
    </div>

    <button type="submit">
      Save Changes
    </button>
  </form>
</div>
  );
}

export default EditIssuePage;