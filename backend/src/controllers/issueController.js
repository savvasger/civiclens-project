// importing the model
const  Issue  = require("../models/issuesModel");

const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.findAll();
        res.json(issues);

    }catch (err) {
        res.status(500).json({message: `${err}`});
    }
}

const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.json(issue);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const createIssue = async (req, res) => {
    try {
        const { title, description, category } = req.body;
    
        if (!title || !description) {
            return res.status(400).json({message: "Title and description are required"});

    }
    

    const newIssue = await Issue.create({
        title,
        description,
        category: category || "General",
        status: "Open",
        createdAt: new Date()
    });
    res.status(201).json(newIssue);
}catch (err) {
        res.status(500).json({message: `${err}`});
}
}

const updateIssue = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        const { title, description, category, status } = req.body;

        issue.title = title || issue.title;
        issue.description = description || issue.description;
        issue.category = category || issue.category;
        issue.status = status || issue.status;

        await issue.save();

        res.json(issue);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        await issue.destroy();
        res.json({ message: "Issue Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};


module.exports = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
};