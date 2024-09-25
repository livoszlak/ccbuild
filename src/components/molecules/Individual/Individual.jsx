import Dropdown from "../../atoms/Dropdown/Dropdown";
import { Checkbox } from "@mui/material";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { useState } from "react";
import styles from "./Individual.module.css";
import Modal from "../Modal/Modal";

export default function Individual(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <tr key={props.rowId}>
        <td>
          <Checkbox />
        </td>
        <td>
          <input
            type="number"
            value={props.row.amount}
            onChange={(e) =>
              props.handleAmountChange(props.row.id, e.target.value)
            }
          />
        </td>
        <td>
          <Dropdown value={props.row.status} options={props.statusOptions} />
        </td>
        <td>
          <Dropdown
            value={props.row.marketplace}
            options={props.marketplaceOptions}
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
      {open && <Modal open={open} handleClose={handleClose} />}
    </>
  );
}
