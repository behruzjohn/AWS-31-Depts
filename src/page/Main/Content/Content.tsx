import { message, Table } from "antd";
import { studentCol, supabase } from "./constants";
import { StyleContent } from "./Content.style";
import { useEffect, useState } from "react";
import type { StudentData } from "./types";
import Modals from "../components/Header/Modal";
import type { JointContent } from "antd/es/message/interface";
type Props = {
  isAdmin: boolean;
};
function ContentPage({ isAdmin }: Props) {
  const [studentData, setStudentData] = useState<StudentData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState("");
  const [plusStudentId, setPlusStudentId] = useState<string>("");
  const [minusStudentId, setMinusStudentId] = useState<string>("");

  const [isPlusModalOpen, setPlusModalOpen] = useState<boolean>(false);
  const [isMinusModalOpen, setMinusModalOpen] = useState<boolean>(false);

  const getDatStudents = async () => {
    let { data, error } = await supabase
      .from("aws-31")
      .select("*")
      .order("balance", { ascending: false });

    const studentData = data;

    if (studentData) {
      setLoading(false);
      setStudentData(studentData as StudentData[]);
    } else {
      setLoading(false);
      message.error(error as JointContent);
    }
  };

  useEffect(() => {
    getDatStudents();
  }, []);

  return (
    <StyleContent>
      <Table
        loading={loading}
        className="no-hover-table"
        dataSource={studentData}
        rowClassName={(_, index) => (index === 0 ? "first-row-highlight" : "")}
        columns={studentCol({
          isAdmin: isAdmin,
          setMinusStudentId: setMinusStudentId,
          setPlusStudentId: setPlusStudentId,
          setPlusModalOpen: setPlusModalOpen,
          setMinusModalOpen: setMinusModalOpen,
        })}
      />

      <Modals
        getDatStudents={getDatStudents}
        plusStudentId={plusStudentId as string}
        setEditModalOpen={setPlusModalOpen}
        action="plus"
        setPrice={setPrice}
        isEditModalOpen={isPlusModalOpen}
        price={price as string}
      />
      <Modals
        getDatStudents={getDatStudents}
        studentData={studentData as StudentData[]}
        minusStudentId={minusStudentId as string}
        setEditModalOpen={setMinusModalOpen}
        action="minus"
        setPrice={setPrice}
        isEditModalOpen={isMinusModalOpen}
        price={price as string}
      />
    </StyleContent>
  );
}

export default ContentPage;
