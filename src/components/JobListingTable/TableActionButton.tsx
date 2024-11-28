import React from "react";

interface TableActionButtonProps {
  icon: React.ElementType;
  className?: string;
  onClick?: () => void;
}

const TableActionButton = ({
  icon: Icon,
  className,
  onClick = () => {},
}: TableActionButtonProps) => {
  return (
    <Icon
      size={30}
      fontSize={16}
      className={`p-1.5 inline-block cursor-pointer ${className}`}
      onClick={onClick}
    />
  );
};

export default TableActionButton;
