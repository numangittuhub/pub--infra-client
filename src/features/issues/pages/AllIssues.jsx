// src/features/issues/pages/AllIssues.jsx
import { useQuery } from "@tanstack/react-query";
import { getAllIssues } from "../../../services/api";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllIssues = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["issues", page, filters],
    queryFn: () =>
      getAllIssues({ page, limit: 9, ...filters }).then((res) => res.data),
    keepPreviousData: true, // পেজ চেঞ্জ করলে পুরোনো ডাটা রাখবে (UX ভালো হয়)
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error text-center">
        Error loading issues: {error.message}
      </div>
    );

  const issues = data?.issues || [];
  const pagination = data?.pagination || { totalPages: 1 };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        All Reported Issues
      </h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <select
          className="select select-bordered w-48"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="select select-bordered w-48"
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All Priority</option>
          <option value="high">High (Boosted)</option>
          <option value="normal">Normal</option>
        </select>

        <select
          className="select select-bordered w-48"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option>Road Damage</option>
          <option>Street Light</option>
          <option>Garbage</option>
          <option>Water Logging</option>
          <option>Others</option>
        </select>
      </div>

      {/* Issues Grid */}
      {issues.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          No issues found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all ${
                issue.priority === "high" ? "ring-4 ring-yellow-400" : ""
              }`}
            >
              {issue.images && issue.images[0] && (
                <figure className="h-48">
                  <img
                    src={issue.images[0]}
                    alt="Issue"
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}

              <div className="card-body">
                <h2 className="card-title text-lg">{issue.title}</h2>

                <div className="flex flex-wrap gap-2 my-2">
                  <div className="badge badge-primary">{issue.category}</div>
                  <div
                    className={`badge ${
                      issue.status === "resolved"
                        ? "badge-success"
                        : issue.status === "in-progress"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {issue.status}
                  </div>
                  {issue.priority === "high" && (
                    <div className="badge badge-error">HIGH PRIORITY</div>
                  )}
                </div>

                <p className="text-sm opacity-70">{issue.location}</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1">
                    <span className="text-lg">Upvotes</span> {issue.upvoteCount || 0}
                  </div>
                  <Link
                    to={`/issue/${issue._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button className="join-item btn btn-active">
            Page {page} of {pagination.totalPages || 1}
          </button>
          <button
            className="join-item btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;