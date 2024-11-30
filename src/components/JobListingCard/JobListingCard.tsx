import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { FaUserTie, FaLocationArrow } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { JobType } from "@/typescript/type";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface JobListingCardProps {
  job: JobType;
  handleJobApply?: (job: JobType) => void;
}

const JobListingCard = ({
  job,
  handleJobApply = () => {},
}: JobListingCardProps) => {
  const { appliedJobs } = useSelector((state: RootState) => state.job);

  const { _id, company, position, contract, location } = job;

  const btnDisabled = appliedJobs.some((job) => job._id === _id);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{company}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="flex items-center gap-2">
          <FaUserTie size={16} /> {position}
        </p>
        <p className="flex items-center gap-2">
          <FaFileContract size={16} /> {contract}
        </p>
        <p className="flex items-center gap-2">
          <FaLocationArrow size={16} /> {location}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleJobApply(job)}
          disabled={btnDisabled}
          className={`${btnDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {}
          {btnDisabled ? "Applied" : "Apply"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
