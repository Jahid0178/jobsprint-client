import JobListingForm from "@/components/Forms/JobListingForm/JobListingForm";

const AddJobPage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-4">Add Job Position</h2>
        <JobListingForm />
      </div>
    </section>
  );
};

export default AddJobPage;
