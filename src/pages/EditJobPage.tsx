import JobListingForm from "@/components/Forms/JobListingForm/JobListingForm";
import Heading from "@/components/Heading/Heading";

const EditJobPage = () => {
  return (
    <section>
      <div className="container">
        <Heading
          title="Edit Job Position"
          subTitle="Edit your job position"
        />
        <JobListingForm />
      </div>
    </section>
  );
};

export default EditJobPage;
