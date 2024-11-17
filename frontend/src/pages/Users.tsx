import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Table from "../components/Table";
import { callApi } from "../api";
import { ERolesLabels, TUser } from "../utils/types";
import { formatDate } from "../utils/formaters";

const columns = [
  'Name',
  'Email',
  'Permissão',
  'Criado em',
];

export default function Users() {
  const [users, setUsers] = useState<string[][]>([])
  const [totalUsers, setTotalUsers] = useState<number>();
  const [page, setPage] = useState(0);

  const getUsers = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/users',
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedUsers = response.data.map(({
      name,
      email,
      role,
      created_at,
    }: TUser) => [
        name,
        email,
        ERolesLabels[role],
        formatDate(created_at),
      ]);

    setUsers(formattedUsers);
    setTotalUsers(response.count);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <main className="p-4">
      <PageTitle text="Usuários" />
      <Table
        columns={columns}
        data={users}
        currentPage={page}
        setPage={setPage}
        totalItems={totalUsers}
      />
    </main>
  )
}