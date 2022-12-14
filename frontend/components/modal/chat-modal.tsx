import { FC, Fragment, KeyboardEvent, useState } from "react";
import { Chat, Send } from "@mui/icons-material";
import {
  Backdrop,
  Badge,
  Box,
  Fade,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Client } from "@xmtp/xmtp-js";
import { useSigner } from "wagmi";

import { chatStyle } from "./modal.styles";

export const ChatModal: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  ////////////////////////////////
  // xmtp config
  const { data: signer } = useSigner();

  const [xmtpMethod, setXmtpMethod] = useState<Client>();
  const [conversationMethod, setConversationMethod] = useState<any>();
  const [messagesList, setMessagesList] = useState<any>();
  const [toAddress, setToAddress] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");

  const connect = async () => {
    // Create the client with your wallet. This will connect to the XMTP development network by default
    if (!signer) {
      alert("Please connect wallet");
      return;
    }
    const xmtp = await Client.create(signer, {
      env: "dev",
    });
    console.log(xmtp);
    setXmtpMethod(xmtp);
  };

  const chatWith = async () => {
    if (!xmtpMethod) return connect();
    const conversation = await xmtpMethod.conversations.newConversation(
      toAddress
    );
    setConversationMethod(conversation);

    const messages = await conversation?.messages();
    console.log(messages);
    setMessagesList(messages);

    // Listen for new messages in the conversation
    for await (const message of await conversation?.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.content}`);
      setMessagesList([...messages, message]);
    }
  };

  const sendMessage = async () => {
    // Send a message
    await conversationMethod?.send(newMessage);
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  //@ts-ignore
  const listChatMessages = messagesList?.map((chatMessageDto) => (
    <ListItem key={chatMessageDto.id}>
      {/* <ListItemButton> */}
      <ListItemText
        sx={{
          backgroundColor: "#D9D9D9",
          padding: "0.5rem",
          border: "1px solid rgba(255, 162, 167, 0.2)",
          borderRadius: "5px",
          color: "#3E4347",
        }}
        primary={
          <Fragment>
            <Typography variant="body2" color="text.secondary">
              {`${chatMessageDto.senderAddress}`}
            </Typography>
          </Fragment>
        }
        secondary={
          <Fragment>
            <Typography variant="body1" color="text.secondary">
              {`${chatMessageDto.content}`}
            </Typography>
          </Fragment>
        }
      />
      {/* </ListItemButton> */}
    </ListItem>
  ));

  return (
    <Fragment>
      <Badge color="secondary" badgeContent={0} showZero>
        <Chat onClick={handleOpen} sx={{ cursor: "pointer" }} />
      </Badge>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={chatStyle}>
            <Box
              sx={{
                width: "30%",
                p: "1.5rem",
                background: " #e3aec0",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            >
              <Typography variant="h2">MESSAGING</Typography>

              <button onClick={connect}>Connect</button>
              <button onClick={chatWith}>chat</button>
            </Box>

            <Box
              sx={{
                width: "70%",
                height: "100%",
                p: "1.5rem 0",
                background: " #fff",
                borderRadius: "0 10px 10px 0",
              }}
            >
              <Box p={1}>
                <Grid container spacing={1} alignItems="center">
                  <Grid xs={12} item>
                    <FormControl fullWidth>
                      <TextField
                        color="secondary"
                        sx={{ input: { color: "blue" } }}
                        onChange={(e) => setToAddress(e.target.value)}
                        value={toAddress}
                        label="input address here"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  {/* <Grid id="chat-window" xs={12} item> */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 320,
                      // bgcolor: "background.paper",
                    }}
                  >
                    <Box position="fixed">
                      <List id="chat-window-messages">{listChatMessages}</List>
                    </Box>
                  </Box>

                  <Grid xs={11} item>
                    <FormControl fullWidth>
                      <TextField
                        color="secondary"
                        sx={{ input: { color: "#000" } }}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleEnterKey}
                        // value={message}
                        label="Type your message..."
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={1} item>
                    <IconButton
                      onClick={sendMessage}
                      aria-label="send"
                      color="secondary"
                    >
                      <Send />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};
