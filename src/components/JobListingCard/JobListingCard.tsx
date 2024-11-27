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

const JobListingCard = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>AB Soft Inc.</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="flex items-center gap-2">
          <FaUserTie size={16} /> Front End Developer
        </p>
        <p className="flex items-center gap-2">
          <FaFileContract size={16} /> Full Time
        </p>
        <p className="flex items-center gap-2">
          <FaLocationArrow size={16} /> Dhaka
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log("apply now")}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
