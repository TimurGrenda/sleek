import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import "./PriorityPicker.scss";

const priorities = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "-", label: "-" },
];

// Ordered weakest -> strongest. Stepping wraps around at both ends.
const sequence = ["-", "C", "B", "A"];

const raisePriority = (priority: string): string => {
  const index = sequence.indexOf(priority);
  return sequence[(index + 1) % sequence.length];
};

const lowerPriority = (priority: string): string => {
  const index = sequence.indexOf(priority);
  return sequence[(index - 1 + sequence.length) % sequence.length];
};

interface PriorityPickerComponentProps {
  priority: string;
  handleChange: (key: string, value: string) => void;
}

const PriorityPickerComponent: React.FC<PriorityPickerComponentProps> = ({
  priority,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleSelectChange = (event: SelectChangeEvent<string>): void => {
    handleChange("priority", event.target.value);
  };

  return (
    <div id="priorityPicker">
      {/* Order: lower | dropdown | clear | raise. The chevrons flank the value
          like stepper arrows; clear sits next to the raise button. */}
      <IconButton
        size="small"
        title={t("todoDialog.priorityPicker.lower")}
        aria-label={t("todoDialog.priorityPicker.lower")}
        onClick={() => handleChange("priority", lowerPriority(priority))}
        data-testid="dialog-picker-priority-lower"
      >
        <ChevronLeftIcon />
      </IconButton>
      <FormControl>
        <InputLabel>{t("todoDialog.priorityPicker.label")}</InputLabel>
        <Select
          className="priorityPickerSelect"
          label={t("todoDialog.priorityPicker.label")}
          value={priority}
          onChange={handleSelectChange}
          data-testid="dialog-picker-priority"
        >
          {priorities.map((priorityOption) => (
            <MenuItem key={priorityOption.value} value={priorityOption.value}>
              {priorityOption.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        size="small"
        title={t("todoDialog.priorityPicker.clear")}
        aria-label={t("todoDialog.priorityPicker.clear")}
        disabled={priority === "-"}
        onClick={() => handleChange("priority", "-")}
        data-testid="dialog-picker-priority-clear"
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        size="small"
        title={t("todoDialog.priorityPicker.raise")}
        aria-label={t("todoDialog.priorityPicker.raise")}
        onClick={() => handleChange("priority", raisePriority(priority))}
        data-testid="dialog-picker-priority-raise"
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default PriorityPickerComponent;
