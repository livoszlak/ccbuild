import Dropdown from "../../atoms/Dropdown/Dropdown";
import { Checkbox } from "@mui/material";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { useState } from "react";
import styles from "./Individual.module.css";
import Modal from "../Modal/Modal";
import { useData } from "../../../contexts/DataContext";

export default function Individual({ row, statusOptions, marketplaceOptions }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { handleProductIndividualChange } = useData();

  const handleDropdownChange = (key) => (value) => {
    handleProductIndividualChange(row.id, key, value);
  };

  return (
    <>
      <tr key={row.id}>
        <td>
          <Checkbox />
        </td>
        <td>
          <input
            type="number"
            value={row.amount || 1}
            onChange={(e) =>
              handleProductIndividualChange(row.id, "amount", e.target.value)
            }
          />
        </td>
        <td>
          <Dropdown
            size='inline'
            options={statusOptions}
            onOptionChange={handleDropdownChange("status")}
            value={row.status || ""}
          />
        </td>
        <td>
          <Dropdown
            size='inline'
            options={marketplaceOptions}
            onOptionChange={handleDropdownChange("marketplace")}
            value={row.marketplace || ""}
          />
        </td>
        <td>
          <CustomButton
            variant="contained"
            text="Lägg till info"
            onClick={handleOpen}
            sx={{ textTransform: "none", borderRadius: "100px" }}
          />
        </td>
      </tr>
      {open && <Modal open={open} handleClose={handleClose} rowId={row.id} />}
    </>
  );
}
