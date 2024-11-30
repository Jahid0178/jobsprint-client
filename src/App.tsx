import { useDispatch, useSelector } from "react-redux";
import JobFiltersPanel from "./components/Filters/JobFiltersPanel";
import JobListingCard from "./components/JobListingCard/JobListingCard";
import SearchBar from "./components/SearchBar/SearchBar";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import {
  applyJob,
  fetchJobs,
  getAppliedJobs,
  resetState,
} from "./features/job/jobSlice";
import { JobType } from "./typescript/type";
import toast from "react-hot-toast";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const { jobs, loading, success, message, error } = useSelector(
    (state: RootState) => state.job
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleJobApply = (job: JobType) => {
    dispatch(applyJob(job._id as string));
  };

  useEffect(() => {
    if (success && !loading && !error) {
      toast.success(message);
      dispatch(getAppliedJobs());
      dispatch(resetState());
    }

    if (!success && !loading && error) {
      toast.error(error as string);
    }

    return () => {
      dispatch(resetState());
    };
  }, [success, loading, error, dispatch, message]);

  return (
    <section>
      <div className="container">
        <div className="mb-4">
          <SearchBar />
        </div>
        <div className="flex justify-between items-center gap-4 mb-5">
          <h2 className="text-2xl font-semibold">All Job Listings</h2>
          <JobFiltersPanel />
        </div>
        {loading && <p className="text-center">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.map((job: JobType) => (
            <JobListingCard
              key={job._id}
              job={job}
              handleJobApply={handleJobApply}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
