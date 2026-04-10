import styled from "@emotion/styled";

export const StyleContent = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #d7cfcf;
  .first-row-highlight {
    background: linear-gradient(135deg, #ffd700, #ffc300, #ff8c00);
    color: #000;
    font-weight: bold;
  }
  .first-row-highlight:hover {
    background-color: #ffd700;
    font-weight: bold;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: transparent !important;
  }
`;
