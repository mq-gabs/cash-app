interface IEmptyChart {
  title: string;
}

export default function EmptyChart({
  title = 'Title',
}: IEmptyChart) {
  return (
    <div className="h-[300px] w-full flex flex-col">
      <text className="font-bold text-sm text-gray-600">{title}</text>
    <div className="flex justify-center items-center  h-full">
      <p className="text-gray-400 text-xl">Nenhum dado encontrado...</p>
    </div>
    </div>
  )
}