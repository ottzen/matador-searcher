import { useQuery } from "@tanstack/react-query"

type data = {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
}

const TodosPage = () => {

    const { isPending, error, data, isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos',
            )
            return await response.json()
        },
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <button onClick={() => refetch()}>Refetch</button>
            {isFetching && <span>Updating...</span>}
            <ul>
                {data.map((todo: data) => (
                    <li key={todo.id}>
                        <span>
                            {`${todo.id} - ${todo.title} - ${todo.completed.toString()} - ${todo.userId}`}
                        </span>
                    </li>
                ))}
            </ul>
            <button onClick={() => refetch}>Refetch</button>


        </>
    )
}

export default TodosPage;