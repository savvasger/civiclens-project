const API_URL = "http://localhost:5000";

export async function getIssues() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/issues`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch issues");
  }

  return response.json();
}

export async function getIssueById(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/issues/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Issue not found");
  }

  return response.json();
}

export async function updateIssue(id, issueData) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/issues/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(issueData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update issue");
  }

  return response.json();
}

export async function deleteIssue(id) {
  const token = localStorage.getItem("token");
  

  const response = await fetch(
    `${API_URL}/issues/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete issue");
  }

  return response.json();
}