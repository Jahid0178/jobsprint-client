import JobListingCard from "@/components/JobListingCard/JobListingCard";

const AppliedJobsPage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (item) => (
              <JobListingCard key={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AppliedJobsPage;
