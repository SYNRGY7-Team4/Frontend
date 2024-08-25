import React, { useEffect, useId, useRef, useState, forwardRef } from "react";
import { format, isValid, parse, isBefore, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";

interface DatePickerFieldProps {
  className?: string;
  ariaLabel?: string;
  idName: string;
  onChange: (date: string) => void;
  value?: string;
}

export const DatePickerField = forwardRef<
  HTMLInputElement,
  DatePickerFieldProps
>(({ className, ariaLabel, idName, onChange, value = "", ...props }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState(value);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const maxDate = startOfDay(new Date()); // Set max date to today

  useEffect(() => {
    if (value) {
      const date = parse(value, "yyyy-MM-dd", new Date());
      if (isValid(date)) {
        setInputValue(format(date, "dd-MM-yyyy"));
        setSelectedDate(date);
      } else {
        setInputValue(value);
      }
    } else {
      setInputValue("");
      setSelectedDate(undefined);
    }
  }, [value]);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
      onChange("");
    } else if (
      isBefore(date, maxDate) ||
      date.getTime() === maxDate.getTime()
    ) {
      const displayFormat = format(date, "dd-MM-yyyy");
      const schemaFormat = format(date, "yyyy-MM-dd");
      setSelectedDate(date);
      setInputValue(displayFormat);
      onChange(schemaFormat);
    }
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parse(newValue, "dd-MM-yyyy", new Date());

    if (
      isValid(parsedDate) &&
      (isBefore(parsedDate, maxDate) ||
        parsedDate.getTime() === maxDate.getTime())
    ) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
      onChange(format(parsedDate, "yyyy-MM-dd"));
    } else {
      setSelectedDate(undefined);
      onChange(newValue);
    }
  };

  return (
    <div className="relative items-center flex">
      <input
        ref={ref}
        className={`w-full bg-neutral-01 py-3 px-5 rounded-lg focus:outline-primary-blue border h-[42px] border-primary-blue ${className}`}
        style={{ fontSize: "inherit" }}
        id={idName}
        type="text"
        value={inputValue}
        placeholder={"dd-mm-yyyy"}
        onChange={handleInputChange}
        {...props}
      />
      <button
        type="button"
        className="absolute right-[8px]"
        onClick={toggleDialog}
        aria-controls="dialog"
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label={ariaLabel}
      >
        📆
      </button>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
        className="rounded-lg p-5"
      >
        <DayPicker
          required={true}
          month={month}
          onMonthChange={setMonth}
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          disabled={{ after: maxDate }}
          footer={
            selectedDate !== undefined &&
            `Selected: ${selectedDate.toDateString()}`
          }
        />
      </dialog>
    </div>
  );
});
