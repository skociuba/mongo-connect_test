'use client';

import {useState} from 'react';

import {
  useGetPostsQuery,
  useAddPostMutation,
} from '../provider/redux/query/Posts';

interface Props {
  _key: string;
  name: string;
  cuisine: string;
}

const Home = () => {
  const [form, setForm] = useState({name: '', cuisine: '', _key: 'newKey'});

  const {data, isError, isLoading} = useGetPostsQuery({});
  const [addPost] = useAddPostMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addPost(form);
      return response;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-200">
      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <main className="mt-4 w-2/3 rounded bg-white p-10 shadow-lg">
          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-gray-700">Topic:</span>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => onChange(e)}
                value={form.name}
                type="text"
                name="name"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Content:</span>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => onChange(e)}
                value={form.cuisine}
                type="text"
                name="cuisine"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add Post
            </button>{' '}
          </form>
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
      )}
    </div>
  );
};
export default Home;
