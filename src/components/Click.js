export default function Click() {
  function handleClick() {
    alert("Button clicked!");
  }
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
