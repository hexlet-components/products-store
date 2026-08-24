import type React from "react";
import type { FC } from "react";
import { Button, CloseButton, Group, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

// Окно собрано руками, а не на Modal из Mantine: тот закрывается по Escape и по
// клику вне окна, и такая подмена изменила бы поведение приложения. Здесь
// меняется только оформление.
const Modal: FC<ModalProps> = ({ title, isOpen, closeModal, children }) => {
  const { t } = useTranslation();

  return (
    <div
      tabIndex={-1}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "3rem",
        // Окно всегда в разметке, как было с классами `modal fade`: закрытое
        // оно прозрачно и уезжает под содержимое страницы, а не удаляется из
        // DOM. Это поведение видят тест-кейсы проекта.
        opacity: isOpen ? 1 : 0,
        zIndex: isOpen ? 1 : -1,
        background: "#00000080",
      }}
    >
      <Paper withBorder shadow="md" radius="md" w={500} maw="90vw">
        <Group justify="space-between" p="md" style={{ borderBottom: "1px solid #dee2e6" }}>
          <Text fw={600} size="lg">
            {title}
          </Text>

          <CloseButton aria-label="Close" />
        </Group>

        {children}

        <Group justify="flex-end" p="md" style={{ borderTop: "1px solid #dee2e6" }}>
          <Button variant="default" onClick={closeModal}>
            {t(($) => $.close)}
          </Button>
        </Group>
      </Paper>
    </div>
  );
};

export default Modal;
