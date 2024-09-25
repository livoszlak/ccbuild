import Dropdown from "../../atoms/Dropdown/Dropdown";
import {Checkbox, Button,} from "@mui/material";
import { useState } from 'react';
import styles from "./Individual.module.css";
import Modal from "../Modal/Modal";

export default function individual(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

return (
<>
    <tr key={props.key}>
      <Checkbox />
      <td>
        <input
          type="number"
          value={props.row.Amount}
          onChange={(e) => handleAmmountChange(props.row.id, e.target.value)}
        />
      </td>
      <td>
        <Dropdown value={props.row.status} options={props.statusOptions}></Dropdown>
      </td>
      <td>
       <Dropdown  value={props.row.marketplace} options={props.marketplaceOptions}></Dropdown>
      </td>
      <td>
        <Button onClick={handleOpen}>Lägg till info</Button>
      </td>
    </tr>
    
<Modal open={open} handleClose={handleClose} />
</>
  );
}