export default function Greet(props) {
  return (
    <div>
      <h1>Greetings, {props.name}!</h1>
      {props.children}
    </div>
  );
}
