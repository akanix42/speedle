import { CharStatus } from "../../lib/statuses";
import classnames from "classnames";

type Props = {
  value?: string;
  status?: CharStatus;
  shakeLevel?: number;
};

export const Cell = ({ value, status, shakeLevel = 0 }: Props) => {
  const classes = classnames(
    "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded shake-lots-cell",
    {
      "bg-white border-slate-200": !status,
      "bg-slate-400 text-white border-slate-400": status === "absent",
      "bg-sky-400 border-sky-400 text-white": status === "correct",
      "bg-yellow-500 text-white border-yellow-500": status === "present",
      [`${shakeLevel <= 1 ? "shake" : "shake-lots"}`]: shakeLevel > 0,
    }
  );

  return (
    <>
      <div className={classes}>{value}</div>
    </>
  );
};
