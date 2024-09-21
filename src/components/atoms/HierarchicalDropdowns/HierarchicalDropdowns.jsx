import React, { useState, useMemo, useContext } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useData } from "../../../contexts/DataContext";
import { Box } from "@mui/material";

const HierarchicalDropdowns = () => {
  const { mainCategories, subcategoriesPrimary, subcategoriesSecondary } =
    useContext(useData);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedPrimary, setSelectedPrimary] = useState("");
  const [selectedSecondary, setSelectedSecondary] = useState("");

  const mainOptions = useMemo(() => {
    return mainCategories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});
  }, [mainCategories]);

  const primaryOptions = useMemo(() => {
    if (!selectedMain) return {};
    return subcategoriesPrimary
      .filter((cat) => cat.mainCategoryId === selectedMain)
      .reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
  }, [selectedMain, subcategoriesPrimary]);

  const secondaryOptions = useMemo(() => {
    if (!selectedPrimary) return {};
    return subcategoriesSecondary
      .filter((cat) => cat.subCategoryPrimaryId === selectedPrimary)
      .reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
  }, [selectedPrimary, subcategoriesSecondary]);

  const handleMainChange = (value) => {
    setSelectedMain(value);
    setSelectedPrimary("");
    setSelectedSecondary("");
  };

  const handlePrimaryChange = (value) => {
    setSelectedPrimary(value);
    setSelectedSecondary("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Dropdown
        title="Main Category"
        options={mainOptions}
        placeholder="Välj huvudkategori"
        onOptionChange={handleMainChange}
        id="main-category"
      />

      {selectedMain && (
        <Dropdown
          title="Primary Subcategory"
          options={primaryOptions}
          placeholder="Välj primär underkategori"
          onOptionChange={handlePrimaryChange}
          id="primary-subcategory"
        />
      )}

      {selectedPrimary && (
        <Dropdown
          title="Secondary Subcategory"
          options={secondaryOptions}
          placeholder="Välj sekundär underkategori"
          onOptionChange={setSelectedSecondary}
          id="secondary-subcategory"
        />
      )}
    </Box>
  );
};

export default HierarchicalDropdowns;
