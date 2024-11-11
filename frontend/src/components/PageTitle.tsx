export default function PageTitle({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return <h1 className={`text-3xl font-bold ${className}`}>{text}</h1>;
}
