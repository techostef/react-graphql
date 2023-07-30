import { SVGProps } from "react";
import theme from "../config/theme";

export const BookmarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="30px"
      height="30px"
      {...props}
    >
      <path
        fill={theme.color.grayLight}
        d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
      />
    </svg>
  );
};
