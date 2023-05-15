import { useMemo } from "react";

const useRollNumbers = (list) => {
  const length = Math.min(list.length,20);
  const multi = parseInt(20/length);
  const giftNum = useMemo(()=>Math.floor(Math.random() * (length)),[length]);
  const controlLength = length - giftNum > 2 ? 1 :length - giftNum + 1;
  const maxCount = length * multi - controlLength;
  return [length,multi,giftNum,maxCount];
}

export default useRollNumbers;