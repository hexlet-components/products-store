import { Loader, VisuallyHidden } from "@mantine/core";

// `output` вместо `<div role="status">`: семантический тег несёт ту же роль
// для скринридеров.
const FallBack = () => (
  <output style={{ display: "block" }}>
    <Loader />
    <VisuallyHidden>Loading...</VisuallyHidden>
  </output>
);

export default FallBack;
