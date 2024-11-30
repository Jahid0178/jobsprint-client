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
import { Link } from "react-router";

interface JobListingCardProps {
  job: JobType;
  inAppliedJobPage?: boolean;
  handleJobApply?: (job: JobType) => void;
}

const JobListingCard = ({
  job,
  inAppliedJobPage = false,
  handleJobApply = () => {},
}: JobListingCardProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { appliedJobs } = useSelector((state: RootState) => state.job);

  const { _id, company, position, contract, location } = job;

  const btnDisabled = appliedJobs.some((job) => job._id === _id);

  return (
    <Card className="bg-white overflow-hidden">
      <CardHeader className="p-0 pb-6">
        <img
          src="https://placehold.co/600x400?text=Job+Sprint"
          alt="job-listing-image"
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <CardTitle className="text-2xl">{company}</CardTitle>
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
      {!inAppliedJobPage && (
        <CardFooter>
          {isAuthenticated ? (
            <Button
              onClick={() => handleJobApply(job)}
              disabled={btnDisabled}
              className={`${
                btnDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {}
              {btnDisabled ? "Applied" : "Apply"}
            </Button>
          ) : (
            <Button asChild>
              <Link to="/auth/login">Apply</Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default JobListingCard;
