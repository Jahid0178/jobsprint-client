import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobLocations, jobTypes } from "@/data/data";
import { RootState } from "@/store/store";
import { JobType } from "@/typescript/type";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

interface JobListingFormProps {
  initialValues: {
    company: string;
    position: string;
    location: string;
    contract: string;
  };
  handleSubmit: (data: JobType) => void;
}

const JobListingForm = ({
  initialValues,
  handleSubmit,
}: JobListingFormProps) => {
  const { id } = useParams();
  const { job } = useSelector((state: RootState) => state.job);
  const form = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (Object.keys(job as JobType).length > 0 && id === job?._id) {
      form.reset({
        ...job,
      });
    }
  }, [job]);

  return (
    <Form {...form}>
      <form
        className="space-y-4 border p-4 rounded-md"
        onSubmit={form.handleSubmit((data) => handleSubmit(data))}
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter position"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobLocations.map((location) => (
                    <SelectItem
                      key={location.id}
                      value={location.value}
                    >
                      {location.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((jobType) => (
                    <SelectItem
                      key={jobType.id}
                      value={jobType.value}
                    >
                      {jobType.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Job</Button>
      </form>
    </Form>
  );
};

export default JobListingForm;
