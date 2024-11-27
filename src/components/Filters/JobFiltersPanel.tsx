import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { jobLocations, jobTypes } from "@/data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFilterSchema } from "@/validation/validations";

const JobFiltersPanel = () => {
  const form = useForm<z.infer<typeof jobFilterSchema>>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      location: "",
      contractType: "",
    },
  });

  const handleJobFilter = (data: z.infer<typeof jobFilterSchema>) => {
    console.log("filter data: ", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Filter Jobs</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => handleJobFilter(data))}>
            <DialogHeader className="mb-4">
              <DialogTitle>Filter Jobs By Panel</DialogTitle>
              <DialogDescription>
                You can filter jobs by location and contract type
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
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
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {jobTypes.map((type) => (
                          <FormItem
                            key={type.id}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={type.value} />
                            </FormControl>
                            <FormLabel className="!mt-0">
                              {type.title}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Apply</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobFiltersPanel;
