import { ResponseiveSize } from "./Responsive";

export const MediaScreen = {
  desktop: `@media only screen and (min-width: ${ResponseiveSize.desktop}px)`,
  tablet: `@media only screen and (min-width: ${ResponseiveSize.mobile}px)and (max-width: ${ResponseiveSize.tablet}px)`,
  mobile: `@media only screen and (max-width: ${ResponseiveSize.mobile}px)`
}