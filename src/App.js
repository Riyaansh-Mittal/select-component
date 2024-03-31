import CustomSelect from "./components/CustomSelect";

const App = () => {
  const options = ['First', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  return (
    <div>
      <h2>Multi-select dropdown:</h2>
      <CustomSelect options={options} multiSelect={true}/>
      <h2>Single-select dropdown:</h2>
      <CustomSelect options={options} multiSelect={false}/>
    </div>
  );
};

export default App;

