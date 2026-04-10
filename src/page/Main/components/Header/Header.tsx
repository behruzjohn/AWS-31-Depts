import { Button, Divider, TextField, Typography } from "@mui/material";
import { HeaderStyle } from "./Header.style";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { message, Modal } from "antd";
type Props = {
  setAdmin: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
};
function Header({ setAdmin, isAdmin }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const secretPassword = "Alicode2026";

  useEffect(() => {
    const val = localStorage.getItem("aws31");
    if (val !== null) {
      setPassword(val ? val : "");
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  const handleOk = () => {
    if (password) {
      if (password === secretPassword) {
        message.success("O'zgaririshingiz mumkun!");
        setAdmin(true);
        setIsModalOpen(false);
        localStorage.setItem("aws31", password);
      } else {
        message.error("Siz o'quvchisiz o'zgartira olmaysiz!");
        localStorage.clear();
      }
    } else {
      message.warning("Mahsus so'zni kiritmadingiz");
    }
  };
  const handleCancel = () => {
    setPassword("");
  };

  return (
    <HeaderStyle>
      <div className="header">
        <h2>Aws 31</h2>

        {!isAdmin ? (
          <Button
            onClick={() => setIsModalOpen(true)}
            color="success"
            variant="contained"
          >
            O'zgartirish
          </Button>
        ) : (
          <Typography>Admin</Typography>
        )}
      </div>
      <Divider />
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        okText="Kirish"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextField
          type="text"
          fullWidth
          size="small"
          style={{ marginTop: 16 }}
          label="Mahsus so'zni kiriting!"
          variant="outlined"
          onChange={(val) => setPassword(val.target.value)}
          placeholder="O'zgarirish uchun mahsus parol yoki so'zni kiriting!"
        />
      </Modal>
    </HeaderStyle>
  );
}

export default Header;
