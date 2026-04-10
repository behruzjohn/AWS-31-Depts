import Header from "./components/Header/Header";
import { StyleMain } from "./Main.style";
import ContentPage from "./Content/Content";
import { Container } from "@mui/material";
import { useState } from "react";

function MainPage() {
  const [isAdmin, setAdmin] = useState(false);
  return (
    <StyleMain>
      <Header isAdmin={isAdmin} setAdmin={setAdmin} />

      <Container maxWidth="lg">
        <ContentPage isAdmin={isAdmin} />
      </Container>
    </StyleMain>
  );
}

export default MainPage;
