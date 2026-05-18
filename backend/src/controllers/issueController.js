let issues = [];

const getAllIssues = (req, res) => {
    res.json(issues);
};

const getIssueById = (req, res) => {
    const issue = issues.find((issue) => issue.id === parseInt(req.params.id));
    if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
    }
    res.json(issue);
};

const createIssue = (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description) {
        return res.status(400).json({message: "Title and description are required"});
    }

    const newIssue = {
        id : issues.lenght + 1,
        title,
        description,
        category: category || "General",
        status: "Open",
        createdAt: new Date()
    }
    issues.push(newIssue);
    res.status(201).json(newIssue);
}

const updateIssue = (req, res) => {
    const issue = issues.find((issue) => issue.id === parseInt(req.params.id));
    if (!issue) {
      return  res.status(404).json({message: "Issue not found!"});
    }

    const { title, description, category, status } = req.body;

    issue.title = title || issue.title;
    issue.description = description || issue.description;
    issue.category = category || issue.category;
    issue.status = status || issue.status;

    res.json(issue);
}

const deleteIssue = (req, res) => {
    const issueIndex = issues.findIndex((issue) => issue.id === parseInt(req.params.id));
    if (issueIndex ===-1) {
        return res.status(404).json({message: "issue Not Found!"});
    }
    issues.splice(issueIndex, 1);
    res.json({message: "Issue Deleted Successfully!"});
}

module.exports = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
};