const API_URL = "http://localhost:5000";

export async function createIssue(issueData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(issueData),
  });

  if (!response.ok) {
    throw new Error("Failed to create issue");
  }

  return response.json();
}