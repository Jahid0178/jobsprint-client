interface HeadingProps {
  title: string;
  subTitle?: string;
  rootClassName?: string;
  className?: string;
}

const Heading = ({
  title,
  subTitle,
  rootClassName = "",
  className = "",
}: HeadingProps) => {
  return (
    <div className={`mb-4 ${rootClassName}`}>
      <h2 className={`text-2xl font-semibold ${className}`}>{title}</h2>
      {subTitle && <p className="text-sm text-neutral-500">{subTitle}</p>}
    </div>
  );
};

export default Heading;
