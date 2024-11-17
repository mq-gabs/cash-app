export default function Main({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="p-4 h-full">
      {children}
    </main>
  )
}