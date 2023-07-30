import { SVGProps } from "react";
import React from "react";
import theme from "../config/theme";

export const DefaultImageIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
    >
      <path
        fill={theme.color.gray}
        d="M169,114.2l-24.7,46.9L87,55.2l-46,149.2H219L169,114.2z M195.4,66.4c3.9,0,7.1-3.9,7.1-8.7c0-4.8-3.2-8.7-7.1-8.7c-3.9,0-7.1,3.9-7.1,8.7C188.2,62.5,191.4,66.4,195.4,66.4z"
      />
      <path
        fill={theme.color.gray}
        d="M239.4,17.9v220.3H16.6V17.9H239.4 M246,10H10v236h236V10L246,10z"
      />
    </svg>
  );
};
