import { useDispatch, useSelector } from "react-redux";
import JobFiltersPanel from "./components/Filters/JobFiltersPanel";
import JobListingCard from "./components/JobListingCard/JobListingCard";
import SearchBar from "./components/SearchBar/SearchBar";
import { AppDispatch, RootState } from "./store/store";
import { useEffect, useState } from "react";
import {
  applyJob,
  fetchJobs,
  getAppliedJobs,
  resetState,
} from "./features/job/jobSlice";
import { JobType } from "./typescript/type";
import toast from "react-hot-toast";
import useDebouncedCallback from "./hooks/useDebouncedCallback";

const App = () => {
  const [query, setQuery] = useState({
    company: "",
    location: "",
    contract: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const { jobs, loading, success, message, error } = useSelector(
    (state: RootState) => state.job
  );

  const debouncedFetchJobs = useDebouncedCallback(() => {
    dispatch(fetchJobs(query));
  }, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    debouncedFetchJobs();
  }, [query]);

  const handleJobApply = (job: JobType) => {
    dispatch(applyJob(job._id as string));
  };

  useEffect(() => {
    if (success && !loading && !error) {
      console.log("message", message);
      console.log(loading);
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
  }, [success, error, dispatch, message]);

  const setQueryPartial: (
    data: Partial<{ company: string; location: string; contract: string }>
  ) => void = (data) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...data }));
  };

  return (
    <section>
      <div className="container">
        <div className="mb-4">
          <SearchBar
            name={"company"}
            onChange={(e) => handleSearch(e)}
            type="search"
          />
        </div>
        <div className="flex justify-between items-center gap-4 mb-5">
          <h2 className="text-2xl font-semibold">All Job Listings</h2>
          <JobFiltersPanel setQuery={setQueryPartial} />
        </div>
        {loading && <p className="text-center text-4xl">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job: JobType) => (
              <JobListingCard
                key={job._id}
                job={job}
                handleJobApply={handleJobApply}
              />
            ))
          ) : (
            <>
              {!loading && (
                <p className="text-center text-2xl col-span-full">
                  No jobs found
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
