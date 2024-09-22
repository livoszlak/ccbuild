import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";
import RadioButton from "../../atoms/RadioButton/RadioButton";

export default function Step3({ selectedSubcategorySecondary }) {
  const { state } = useData();

  const subcategorySecondary = state.subcategoriesSecondary.find(
    (subcategory) => subcategory.id.toString() === selectedSubcategorySecondary
  );

  if (!selectedSubcategorySecondary) {
    return (
      <div>
        <h1>Egenskaper</h1>
        <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>Egenskaper</h1>
        {subcategorySecondary && subcategorySecondary.propertyKeys ? (
          Object.keys(subcategorySecondary.propertyKeys).map((key) => (
            <div key={key}>
              {subcategorySecondary.propertyKeys[key] ? (
                <RadioButton
                  title={key}
                  values={subcategorySecondary.propertyKeys[key]}
                />
              ) : (
                <Textfield title={key} />
              )}
            </div>
          ))
        ) : (
          <div>
            <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
          </div>
        )}
      </div>
    </>
  );
}
