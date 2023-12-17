import { forwardRef, Ref, useState, useCallback } from "react";
import { Input, InputProps } from "./input";

export type InputSearchProps = {
  name?: string;
  timer?: number;
  onChangeValue?: (n: string) => void;
} & InputProps;

export const InputSearch = forwardRef(function InputSearchElement(
  {
    color = "primary",
    timer = 500,
    onChangeValue = () => null,
    ...rest
  }: InputSearchProps,
  ref: Ref<HTMLInputElement>
) {
  const [time, setTime] = useState<NodeJS.Timeout>(
    setTimeout(() => {
      return;
    }, 1)
  );
  const [text, setText] = useState<string>("");

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
      clearTimeout(time);

      const func = setTimeout(() => {
        if (onChangeValue) onChangeValue(value);
      }, timer);

      setTime(func);
    },
    [time, onChangeValue]
  );

  return (
    <Input
      ref={ref}
      onInput={handleChangeText}
      color={color}
      value={text}
      {...rest}
    />
  );
});
