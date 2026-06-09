import { useEffect, useState } from "react";
import { getIssues } from "../services/issuesService";
import IssueCard from "../components/IssueCard";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

function IssuesPage() {
const [issues, setIssues] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
  // const navigate = useNavigate();


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

// ? In case i need a seperate logout button on this page, but i think it should be in the navbar
  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // }
 const filteredIssues = issues.filter((issue) => {
  const matchesSearch =
    issue.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    issue.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div>
  
      <Navbar />
      <h1>Community Issues</h1>
      <input className="search-input"
  type="text"
  placeholder="Search issues..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<select className="category-select"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="General">General</option>
  <option value="Infrastructure">Infrastructure</option>
  <option value="Safety">Safety</option>
  <option value="Environment">Environment</option>
</select>

      {filteredIssues.length === 0 ? (
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