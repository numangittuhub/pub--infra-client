// src/features/issues/components/ReportIssueModal.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportIssue } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const ReportIssueModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: reportIssue,
    onSuccess: () => {
      toast.success("Issue reported successfully!");
      queryClient.invalidateQueries(["issues"]);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Report New Issue</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" className="input input-bordered w-full mt-4" placeholder="Title" required />
          <textarea name="description" className="textarea textarea-bordered w-full mt-4" placeholder="Description" required />
          <select name="category" className="select select-bordered w-full mt-4" required>
            <option value="">Select Category</option>
            <option>Road Damage</option>
            <option>Street Light</option>
            <option>Garbage</option>
            <option>Water Logging</option>
            <option>Others</option>
          </select>
          <input name="location" className="input input-bordered w-full mt-4" placeholder="Location (e.g., Mirpur 10)" required />
          <input type="file" name="images" multiple accept="image/*" className="file-input w-full mt-4" />

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Issue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;