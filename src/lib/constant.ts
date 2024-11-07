export const AUTH_STORAGE_KEY = "OSS_AUTH_USER";
export const AUTH_STORAGE_TOKEN = "OSS_ACCESS_TOKEN";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const GITHUB_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(gitlab\.com|gitlab\.[a-z]{2,3})\/.+/;

export const ORDER_STATUS = {
  PENDING: "Created",
  ACCEPTED: "Accepted",
  RESPONSE_SUBMITTED: "Response Submitted",
  COMPLETED_ORDER: "Completed Order",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
  UPLOAD_DELIVERABLE: "Deliverable Uploaded",
  PROJECT_DETAILS: "Project Details",
  ADDITIONAL_DETAILS: "Additional Details",
  SERVICE_OFFERED: "Service Offered",
  RISK_ASSESSMENT: "Risk Assessment",
  REMEDIATION: "Remediation",
};

export const REMEDIATION_STATUS = {
  OUTDATED: "Outdated",
  UPDATED: "Updated",
  UNRESOLVE: "Unresolve",
  INPROGRESS: "InProgress",
  RESOLVED: "Resolved",
};

export const INVALID_URL_MESSAGE = "Invalid URL";

export const TIME_ZONE = {
  EST: "America/New_York",
};

export const PRODUCT_CATEGORY = {
  projects: "OSS Project",
  "ml-models": "ML Model",
};
