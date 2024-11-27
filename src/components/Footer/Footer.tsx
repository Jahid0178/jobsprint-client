const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className="py-4 bg-gray-200">
      <div className="container">
        <p className="text-center">
          &copy; {fullYear} JobSprint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
