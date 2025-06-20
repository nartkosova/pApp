import CategorySelector from "../../components/CategorySelector/CategorySelector";

const PriceCheckSelector = () => {
  return (
    <CategorySelector
      routeBase="/price-check"
      buttonLinks={[
        { label: "Shiko Qmimet Per Podravken", path: "/podravka" },
        { label: "Shiko Qmimet Per Konkurrencen", path: "/konkurrenca" },
      ]}
      categoryRequired={true}
    />
  );
};

export default PriceCheckSelector;
