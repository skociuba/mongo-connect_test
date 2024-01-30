'use client';
import {useGetPostsQuery} from '../provider/redux/query/Posts';

interface Props {
  _key: string;
  name: string;
  cuisine: string;
}

const Home = () => {
  const {data, isError, isLoading} = useGetPostsQuery({});

  console.log({data, isError, isLoading});
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-200">
      <main className="mt-4 w-2/3 rounded bg-white p-10 shadow-lg">
        {data?.data?.map((restaurant: Props) => (
          <div
            key={restaurant._key}
            className="mt-4 flex flex-col items-start rounded bg-gray-100 p-4 shadow-lg">
            <div className="m-10 flex flex-col">
              <h2 className="mb-2 text-xl font-bold text-red-700">
                Topic: {restaurant.name}
              </h2>
              <p className="text-gray-600">Content: {restaurant.cuisine}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
export default Home;
