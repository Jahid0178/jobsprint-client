import Heading from "@/components/Heading/Heading";
import JobListingForm from "@/components/Forms/JobListingForm/JobListingForm";
import { JobType } from "@/typescript/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAppliedJobs, postJob, resetState } from "@/features/job/jobSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AddJobPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { success, loading } = useSelector((state: RootState) => state.job);
  const initialValues = {
    company: "",
    position: "",
    contract: "",
    location: "",
  };

  const handleSubmit = (data: JobType) => {
    dispatch(postJob(data));
  };

  useEffect(() => {
    if (success && !loading) {
      toast.success("Job added successfully");
      navigate("/dashboard/job-listings");
    }

    return () => {
      dispatch(resetState());
    };
  }, [success, loading]);

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, []);
  return (
    <section>
      <div className="container">
        <Heading
          title="Add Job Position"
          subTitle="Add a new job position"
        />
        <JobListingForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default AddJobPage;
