export default function Pagamento() {
  const [, queries] = window.location.href.split('?')

  console.log({ queries });

  return(
    <div>
    <h1>Pagamento Único</h1>
    <p>id: {queries}</p>
    </div>
  );
}
