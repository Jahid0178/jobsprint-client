import Heading from "@/components/Heading/Heading";
import JobListingForm from "@/components/Forms/JobListingForm/JobListingForm";

const AddJobPage = () => {
  return (
    <section>
      <div className="container">
        <Heading
          title="Add Job Position"
          subTitle="Add a new job position"
        />
        <JobListingForm />
      </div>
    </section>
  );
};

export default AddJobPage;
