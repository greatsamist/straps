import { FC } from "react";
import { Facebook, Twitter, YouTube } from "@mui/icons-material";
import { Box, Container, List, ListItemText, Typography } from "@mui/material";
import Image from "next/image";

import {
  StyledFooter,
  StyledFooterIcon,
  StyledFooterIcons,
  StyledListItem,
} from "./footer.styles";

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  const {} = props;
  return (
    <Container sx={{ m: "6rem auto" }}>
      <Box display="flex" justifyContent="space-between">
        <Box
          sx={{
            flex: "0 0 30%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Image src="/logoSvg.svg" height={30} width={30} alt="strap logo" />
            <StyledFooterIcons>
              <Twitter sx={StyledFooterIcon} />
            </StyledFooterIcons>
            <StyledFooterIcons>
              <Facebook sx={StyledFooterIcon} />
            </StyledFooterIcons>
            <StyledFooterIcons>
              <YouTube sx={StyledFooterIcon} />
            </StyledFooterIcons>
          </Box>
        </Box>
        <StyledFooter>
          <Typography color="secondary">Strap</Typography>
          <List>
            <StyledListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"About Us"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Partners"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Investors"}
              />
            </StyledListItem>
          </List>
        </StyledFooter>
        <StyledFooter>
          <Typography>SUPPORT</Typography>
          <List>
            <StyledListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"FAQ"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Privacy and Policy"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Terms & Conditions"}
              />
            </StyledListItem>
          </List>
        </StyledFooter>
        <StyledFooter>
          <Typography>CONTACT US</Typography>
          <List>
            <StyledListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Mailing Address:xx00 E. Union Ave"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"Suite 1100. Denver, CO 80237"}
              />
              <ListItemText
                primaryTypographyProps={{ fontSize: "0.8rem" }}
                primary={"+999 90932 627"}
              />
              <a
                href="https://github.com/greatsamist"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: "0.8rem" }}
                  primary={"Samuel:github"}
                />
              </a>
            </StyledListItem>
          </List>
        </StyledFooter>
      </Box>
    </Container>
  );
};

interface FooterProps {}
