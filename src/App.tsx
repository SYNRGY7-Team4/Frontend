import Button from "./components/Button/Button";

function App() {
  return (
    <>
      <div className="text-secondary-red shadow-03">Hello World</div>

      <Button
        variant="primary"
        className="bg-primary-darkBlue"
        disabled={false}
        size="md"
      >
        Custom Button
      </Button>
    </>
  );
}

export default App;
