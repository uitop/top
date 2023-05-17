import { useMemo } from "react";
import { Tdata } from "@/store/zzimStore";
const useRollNumbers = (list:Tdata[]) => {
  const length = Math.min(list.length,20);
  const multi = Math.floor(20/length);
  const giftNum = useMemo(()=>Math.floor(Math.random() * (length)),[length]);
  const controlLength = length - giftNum > 2 ? 1 :length - giftNum + 1;
  const maxCount = length * multi - controlLength;
  return [length,multi,giftNum,maxCount];
}

export default useRollNumbers;