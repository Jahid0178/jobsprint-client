import { Link } from "react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableActionButton from "./TableActionButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { JobType } from "@/typescript/type";
import { useEffect } from "react";
import { deleteJobPost, fetchJobs, resetState } from "@/features/job/jobSlice";
import toast from "react-hot-toast";

const JobListingTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { jobs, success, loading, message } = useSelector(
    (state: RootState) => state.job
  );
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteJobPost(id));
  };
  useEffect(() => {
    if (success && !loading) {
      toast.success(message);
      dispatch(resetState());
      dispatch(fetchJobs());
    }
  }, [success, loading]);

  return (
    <Table className="border bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job: JobType, index: number) => (
          <TableRow key={job._id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell>{job.position}</TableCell>
            <TableCell>{job.contract}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell className="flex justify-end items-center gap-1">
              <Link to={`/dashboard/job-listings/${job._id}/edit`}>
                <TableActionButton icon={FaRegEdit} />
              </Link>
              <TableActionButton
                icon={FaRegTrashAlt}
                className="text-red-500"
                onClick={() => handleDelete(job._id as string)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobListingTable;
