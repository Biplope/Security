const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/auditlogController");

// Route to get all audit logs
router.get("/logs", auditLogController.fetchAllAuditLogs);

// Route to get audit logs by userId
router.get("/logs/user/:userId", auditLogController.fetchAuditLogsByUserId);

// Route to get audit logs by action
router.get("/logs/action/:action", auditLogController.fetchAuditLogsByAction);

module.exports = router;