const OrderProgressIcon = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Order Progress</title>
      <g opacity="0.5" clipPath="url(#clip0_69_15579)">
        <path
          d="M1.66675 14.1666L10.0001 18.3333L18.3334 14.1666"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.66675 10L10.0001 14.1667L18.3334 10"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0001 1.66663L1.66675 5.83329L10.0001 9.99996L18.3334 5.83329L10.0001 1.66663Z"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_69_15579">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OrderProgressIcon;
