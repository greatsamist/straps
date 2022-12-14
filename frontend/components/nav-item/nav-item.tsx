import { FC, Fragment, HTMLAttributeAnchorTarget, ReactNode } from "react";
import { default as NextLink } from "next/link";

import { StyledLink } from "./nav-item.styles";

export const NavItem: FC<NavItemProps> = (props: NavItemProps) => {
  const { href, target, children } = props;

  return (
    <Fragment>
      <NextLink href={href} target={target} passHref>
        <StyledLink underline="hover">{children}</StyledLink>
      </NextLink>
    </Fragment>
  );
};

interface NavItemProps {
  href: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}
