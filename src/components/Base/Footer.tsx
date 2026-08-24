import { Anchor, Container, Text } from "@mantine/core";

const Footer = () => (
  <footer style={{ background: "var(--mantine-color-dark-8)", padding: "1.5rem 0" }}>
    <Container size="xl" ta="center" c="white">
      {"created by "}

      <Anchor href="https://ru.hexlet.io" target="_blank" rel="noreferrer" underline="never">
        Hexlet
      </Anchor>

      <Text>version 2</Text>
    </Container>
  </footer>
);

export default Footer;
