import Heading from "@/components/Heading/Heading";
import JobListingTable from "@/components/JobListingTable/JobListingTable";

const JobListingsPage = () => {
  return (
    <section>
      <div className="container">
        <Heading
          title="All Job Listings"
          subTitle="All job positions you have listed"
        />
        <JobListingTable />
      </div>
    </section>
  );
};

export default JobListingsPage;
