import CustomSelect from "./components/CustomSelect";

const App = () => {
  const options = [
    "First",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "twenty-five",
  ];

  return (
    <div>
      <h2>Multi-select dropdown:</h2>
      <CustomSelect options={options} multiSelect={true} />
      {/* multiSelect prop is used to determine whether the component is multi-select or single-select */}
      <h2>Single-select dropdown:</h2>
      <CustomSelect options={options} multiSelect={false} />
    </div>
  );
};

export default App;
