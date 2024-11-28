import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableActionButton from "./TableActionButton";

const JobListingTable = () => {
  return (
    <Table className="border bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>ABC Inc</TableCell>
          <TableCell>Front End Developer</TableCell>
          <TableCell>Full Time</TableCell>
          <TableCell>Dhaka</TableCell>
          <TableCell className="flex justify-end items-center gap-1">
            <TableActionButton
              icon={FaRegEdit}
              onClick={() => console.log("edit")}
            />
            <TableActionButton
              icon={FaRegTrashAlt}
              className="text-red-500"
              onClick={() => console.log("delete")}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default JobListingTable;
