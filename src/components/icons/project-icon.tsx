const ProjectIcon = ({ ...props }) => {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      {...props}
    >
      <title>Project</title>
      <path
        d="M2.83325 24.0833L16.9999 31.1666L31.1666 24.0833"
        stroke="black"
        strokeWidth="2.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.83325 17L16.9999 24.0833L31.1666 17"
        stroke="black"
        strokeWidth="2.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9999 2.83325L2.83325 9.91659L16.9999 16.9999L31.1666 9.91659L16.9999 2.83325Z"
        stroke="black"
        strokeWidth="2.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProjectIcon;
