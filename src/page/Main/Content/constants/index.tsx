/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import type { StudentData } from "../types";
import plus from "../../../../assets/plus.svg";
import minus from "../../../../assets/minus.svg";

import { Space, type TableProps } from "antd";
import { IconButton } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

const supabaseUrl = "https://rjnsjadhvgjmhbakawwg.supabase.co";
const supabaseKey = "sb_publishable_kO9zZ0xvxjmIbiPLmtyzQA_bsfec6PY";
export const supabase = createClient(supabaseUrl, supabaseKey);
type Props = {
  setPlusStudentId: Dispatch<SetStateAction<string>>;
  isAdmin: boolean;
  setMinusModalOpen: Dispatch<SetStateAction<boolean>>;
  setPlusModalOpen: Dispatch<SetStateAction<boolean>>;
  setMinusStudentId: Dispatch<SetStateAction<string>>;
};
export const studentCol = ({
  setMinusStudentId,
  isAdmin,
  setPlusStudentId,
  setMinusModalOpen,
  setPlusModalOpen,
}: Props) => {
  const columns: TableProps<StudentData>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Full Name", dataIndex: "studentName", key: "studentName" },
    {
      title: "Balance",
      key: "balance",
      render: (_, render) => formatPrice(render?.balance),
    },
    ...(isAdmin
      ? [
          {
            key: "action",
            title: "Action",
            render: (_: any, record: StudentData) => (
              <Space size="middle">
                <IconButton
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    setMinusStudentId(record?.id as string);
                    setMinusModalOpen(true);
                  }}
                >
                  <img style={{ width: 16, height: 16 }} src={minus} />
                </IconButton>

                <IconButton
                  style={{ backgroundColor: "green" }}
                  onClick={() => {
                    setPlusStudentId(record?.id);
                    setPlusModalOpen(true);
                  }}
                >
                  <img style={{ width: 16, height: 16 }} src={plus} />
                </IconButton>
              </Space>
            ),
          },
        ]
      : []),
  ];
  return columns;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ", {
    currency: "UZS",
    style: "currency",
  }).format(price);
};

export const formatNumber = (val: string | number) => {
  if (!val) return "";
  const num = String(val).replace(/\D/g, "");
  return new Intl.NumberFormat("uz-UZ").format(Number(num));
};
