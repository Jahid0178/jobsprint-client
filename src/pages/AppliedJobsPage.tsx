import Heading from "@/components/Heading/Heading";
import JobListingCard from "@/components/JobListingCard/JobListingCard";
import { getAppliedJobs } from "@/features/job/jobSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppliedJobsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { appliedJobs } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, [dispatch]);

  return (
    <section>
      <div className="container">
        <Heading
          title="Applied Jobs"
          subTitle="You have applied to these jobs"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {appliedJobs.map((job) => (
            <JobListingCard
              key={job._id}
              job={job}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppliedJobsPage;
