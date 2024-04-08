"use client";
import { useStepsStore } from "app/store/steps";

export default function Steps() {
  const step = useStepsStore((state) => state.steps);
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold">Seleccionar Servicio</h3>
      <ul className="flex items-start">
        <li
          className={
            step >= 1
              ? "w-1/3 bg-greenStep h-5 border border-greenStep"
              : "w-1/3 bg-gray-400 h-5 border border-gray-400"
          }
        ></li>
        <li
          className={
            step >= 2
              ? "w-1/3 bg-greenStep h-5 border border-greenStep"
              : "w-1/3 bg-gray-400 h-5 border border-gray-400"
          }
        ></li>
        <li
          className={
            step >= 3
              ? "w-1/3 bg-greenStep h-5 border border-greenStep"
              : "w-1/3 bg-gray-400 h-5 border border-gray-400"
          }
        ></li>

        {/* {step >= 2 && (
          <li className="w-1/3 bg-greenStep h-5 border border-greenStep"></li>
        )}
        {step >= 3 && (
          <li className="w-1/3 bg-greenStep h-5 border border-greenStep"></li>
        )} */}
      </ul>
    </div>
  );
}
