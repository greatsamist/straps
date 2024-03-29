import { FC, Fragment } from "react";
import { Wallet } from "@mui/icons-material";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import Link from "next/link";

import { WellBox } from "./section.styles";

export const HowItWorksSection: FC = () => {
  return (
    <Fragment>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: "#171B24",
          height: "auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        <Typography variant="h2">How It Works</Typography>

        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
            marginTop: "3rem",
            padding: "0 5rem",
          }}
        >
          <CardMedia
            height="90px"
            component="img"
            src="./assets/images/Howitworks.svg"
            title="How straps work image"
            sx={{ objectFit: "contain" }}
          />
        </Container>

        <Container>
          <WellBox>
            <Typography variant="h6">
              DELIVERIES ARE SENT OUT TO DESIGNATED LOCATIONS AND RECORDED
              IMMUTABLY ON THE BLOCKCHAIN
            </Typography>

            <Typography variant="h6">
              UPON RECEIVING THE GOODS, THE RECEIVING PARTY CHECKS AND ATTEST TO
              THE INFORMATION PROVIDED
            </Typography>

            <Typography variant="h6">
              IN THE LIKELY EVENT THAT THERE ARE ANY DISCREPANCIES A DISPUTE IS
              OPENED ACCORDINGLY
            </Typography>
          </WellBox>
        </Container>
        <Link href="/create">
          <Button
            variant="outlined"
            endIcon={<Wallet />}
            sx={{
              textAlign: "center",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            CREATE FOR YOUR BUSINESS
          </Button>
        </Link>
      </Box>
    </Fragment>
  );
};
