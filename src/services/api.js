// src/services/api.js (নতুন ফাইল)
import api from "../lib/axiosInstance";
export const reportIssue = (data) => api.post("/issues", data);
export const getAllIssues = (params) => api.get("/issues", { params });
export const getIssue = (id) => api.get(`/issues/${id}`);
export const upvoteIssue = (id) => api.post(`/issues/${id}/upvote`);
export const boostIssue = (id) => api.post("/payments/boost", { issueId: id });
export const createSubscription = () => api.post("/payments/subscribe");
export const getInvoice = (sessionId) => api.get(`/payments/invoice?sessionId=${sessionId}`, { responseType: "blob" });