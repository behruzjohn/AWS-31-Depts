import { message, Modal } from "antd";
import { PriceInput } from "../../../../components/PriceInput/PriceInput";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { supabase } from "../../Content/constants";
import type { StudentData } from "../../Content/types";
type Props = {
  setPrice: Dispatch<SetStateAction<string>>;
  isEditModalOpen: boolean;
  minusStudentId?: string;
  studentData?: StudentData[];
  price: string;
  getDatStudents: () => void;
  plusStudentId?: string;
  action: string;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};
function Modals({
  action,
  setPrice,
  plusStudentId,
  getDatStudents,
  studentData,
  isEditModalOpen,
  minusStudentId,
  price,
  setEditModalOpen,
}: Props) {
  const handleCancel = () => {
    setEditModalOpen(false);
  };

  const onEdit = async () => {
    const isPlus = action === "plus";

    const studentId = isPlus ? plusStudentId : minusStudentId;

    const currentStudent = studentData?.find((item) => item.id === studentId);

    const currentBalance = currentStudent?.balance ?? 0;
    const amount = Number(price);

    const newBalance = isPlus
      ? currentBalance + amount
      : currentBalance - amount;

    const { data } = await supabase
      .from("aws-31")
      .update({ balance: newBalance })
      .eq("id", studentId)
      .select();

    if (data) {
      message.success(
        isPlus
          ? "Qarz muvafoqiyatli qo'shildi!"
          : "Qarz muvafoqiyatli ayirildi!",
      );
      getDatStudents();

      setEditModalOpen(false);
    }
  };

  useEffect(() => {
    setPrice("");
  }, [isEditModalOpen]);
  return (
    <Modal
      title={
        action === "plus"
          ? "O'quvchiga qarz yozish!"
          : "O'quvchini qarzini ayirish"
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={isEditModalOpen}
      okText={action === "plus" ? "Qo'shish" : "Ayirish"}
      onOk={onEdit}
      onCancel={handleCancel}
    >
      <PriceInput
        suffix="UZS"
        size="large"
        value={price}
        style={{ marginTop: 14 }}
        placeholder="To'lov summasi"
        onChange={(e) => setPrice(e.target.value)}
      />
    </Modal>
  );
}

export default Modals;
