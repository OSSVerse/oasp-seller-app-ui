const CreditCardIcon = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Credit Card Icon</title>
      <g>
        <path
          d="M17.5002 3.3335H2.50016C1.57969 3.3335 0.833496 4.07969 0.833496 5.00016V15.0002C0.833496 15.9206 1.57969 16.6668 2.50016 16.6668H17.5002C18.4206 16.6668 19.1668 15.9206 19.1668 15.0002V5.00016C19.1668 4.07969 18.4206 3.3335 17.5002 3.3335Z"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.833496 8.3335H19.1668"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CreditCardIcon;
