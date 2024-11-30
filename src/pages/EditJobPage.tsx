import JobListingForm from "@/components/Forms/JobListingForm/JobListingForm";
import Heading from "@/components/Heading/Heading";
import { editPost, resetState, singleJobPost } from "@/features/job/jobSlice";
import { AppDispatch, RootState } from "@/store/store";
import { JobType } from "@/typescript/type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const EditJobPage = () => {
  const navigate = useNavigate();
  const { success, message, loading } = useSelector(
    (state: RootState) => state.job
  );
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleJobPost(id as string));
  }, []);

  const initialValues = {
    company: "",
    position: "",
    contract: "",
    location: "",
  };

  const handleSubmit = (data: JobType) => {
    dispatch(editPost(data));
  };

  useEffect(() => {
    if (success && !loading) {
      toast.success(message);
      dispatch(resetState());
      navigate("/dashboard/job-listings");
    }
  }, [success, loading]);
  return (
    <section>
      <div className="container">
        <Heading
          title="Edit Job Position"
          subTitle="Edit your job position"
        />
        <JobListingForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          btnValue="Update Job"
        />
      </div>
    </section>
  );
};

export default EditJobPage;
