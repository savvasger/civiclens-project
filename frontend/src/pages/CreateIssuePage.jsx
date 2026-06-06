import { useState } from "react";
import { createIssue } from "../services/createIssueService";

function CreateIssuePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const newIssue = await createIssue({
        title,
        description,
        category,
      });

      console.log("Created:", newIssue);

      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Create Issue</h1>

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
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button type="submit">
          Create Issue
        </button>
      </form>
    </div>
  );
}

export default CreateIssuePage;