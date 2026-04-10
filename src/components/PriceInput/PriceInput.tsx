import { Input, type InputProps } from "antd";
import { formatNumber } from "../../page/Main/Content/constants";
import type { ChangeEvent } from "react";

export function PriceInput({ value, onChange, ...props }: InputProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");

    if (onChange) {
      const clonedEvent = {
        ...event,
        target: {
          ...event.target,
          value: rawValue,
        },
      };
      onChange(clonedEvent);
    }
  };
  return (
    <Input
      type="text"
      minLength={4}
      maxLength={14}
      onChange={handleChangeInput}
      value={formatNumber(value as string)}
      {...props}
    />
  );
}
