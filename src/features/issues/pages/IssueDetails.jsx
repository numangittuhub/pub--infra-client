// src/features/issues/pages/IssueDetails.jsx
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getIssue, upvoteIssue, boostIssue, getInvoice } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const IssueDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams(); // useLocation → useSearchParams দিয়ে রিপ্লেস
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: issue, isLoading, error } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssue(id).then((res) => res.data),
  });

  const upvoteMutation = useMutation({
    mutationFn: () => upvoteIssue(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["issue", id]);
      queryClient.invalidateQueries(["issues"]); // All Issues পেজেও আপডেট
      toast.success("Upvoted successfully!");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Already upvoted"),
  });

  const boostMutation = useMutation({
    mutationFn: () => boostIssue(id),
    onSuccess: (res) => {
      window.location.href = res.data.url;
    },
    onError: (err) => toast.error(err.response?.data?.message || "Cannot boost this issue"),
  });

  const downloadInvoice = async () => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return toast.error("No payment session found");

    try {
      const res = await getInvoice(sessionId);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Invoice downloaded!");
    } catch (err) {
      toast.error("Failed to download invoice");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error text-center">
        Failed to load issue: {error.message}
      </div>
    );

  const isOwner = currentUser?._id === issue?.reportedBy?._id;
  const canEdit = isOwner && issue?.status === "pending";
  const alreadyUpvoted = issue?.upvotes?.includes(currentUser?._id);
  const hasPaymentSuccess = searchParams.get("session_id");

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      {/* Payment Success Alert */}
      {hasPaymentSuccess && (
        <div className="alert alert-success shadow-lg mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-lg font-semibold">
              Payment Successful! Your issue is now <strong>HIGH PRIORITY</strong>
            </span>
          </div>
          <button onClick={downloadInvoice} className="btn btn-sm btn-outline">
            Download Invoice (PDF)
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <h1 className="text-3xl font-bold">{issue.title}</h1>
                <div className="flex gap-3">
                  {issue.priority === "high" && (
                    <div className="badge badge-error badge-lg animate-pulse">HIGH PRIORITY</div>
                  )}
                  <div className={`badge badge-lg ${issue.status === "resolved" ? "badge-success" : "badge-warning"}`}>
                    {issue.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mt-4 text-lg">{issue.description}</p>

              <div className="grid grid-cols-2 gap-6 my-8 text-sm">
                <div><strong>Category:</strong> {issue.category}</div>
                <div><strong>Location:</strong> {issue.location}</div>
                <div><strong>Reported by:</strong> {issue.reportedBy?.name || "Anonymous"}</div>
                <div><strong>Date:</strong> {format(new Date(issue.createdAt), "dd MMM yyyy, hh:mm a")}</div>
              </div>

              {/* Images */}
              {issue.images?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {issue.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Issue ${i + 1}`}
                      className="rounded-lg shadow-lg w-full h-80 object-cover hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => upvoteMutation.mutate()}
                  disabled={!currentUser || alreadyUpvoted || upvoteMutation.isLoading}
                  className={`btn btn-outline btn-lg ${alreadyUpvoted ? "btn-disabled" : "btn-primary"}`}
                >
                  Upvotes {issue.upvoteCount || 0} {alreadyUpvoted && "(You voted)"}
                </button>

                {isOwner && !issue.isBoosted && issue.status === "pending" && (
                  <button
                    onClick={() => boostMutation.mutate()}
                    disabled={boostMutation.isLoading}
                    className="btn btn-warning btn-lg"
                  >
                    {boostMutation.isLoading ? "Redirecting..." : "Boost for ৳100"}
                  </button>
                )}

                {canEdit && (
                  <Link to={`/dashboard/my-issues/edit/${issue._id}`} className="btn btn-info btn-lg">
                    Edit Issue
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl sticky top-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Activity Timeline</h2>
              {issue.timeline?.length > 0 ? (
                <ul className="steps steps-vertical space-y-6">
                  {issue.timeline.slice().reverse().map((entry, idx) => (
                    <li
                      key={idx}
                      className={`step ${entry.status === "resolved" || entry.status === "closed" ? "step-success" : "step-primary"}`}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{entry.message || entry.status}</div>
                        <div className="text-sm opacity-70">
                          by {entry.by?.name || "System"} ({entry.byRole})
                        </div>
                        <div className="text-xs opacity-60">
                          {format(new Date(entry.timestamp), "dd MMM yyyy, hh:mm a")}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No activity yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;