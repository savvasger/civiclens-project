const express = require('express');
const validateSession = require('../middlewares/validate');
const {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
} = require('../controllers/issueController');

const router = express.Router();

router.get("/", getAllIssues);
router.get("/:id", getIssueById);


router.post("/", validateSession, createIssue);
router.put("/:id", validateSession, updateIssue);
router.delete("/:id", validateSession, deleteIssue);

module.exports = router;