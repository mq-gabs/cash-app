interface ILoading {
  className?: string;
}

export default function Loading({ className = "" }: ILoading) {
  return <div className={`rounded bg-gray-200 animate-pulse ${className}`} />;
}
