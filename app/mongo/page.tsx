'use client';
import {useState, useEffect} from 'react';

interface Restaurant {
  _key: string;
  name: string;
  cuisine: string;
}

const Page: React.FC = () => {
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
  const [form, setForm] = useState({name: '', cuisine: ''});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/mongo/api');
      const data = await response.json();
      setRestaurant(data.data);
    };

    fetchData();
  }, []);

  async function addRestaurant(restaurant: Restaurant) {
    const response = await fetch('/mongo/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });

    if (!response.ok) {
      throw new Error('Error adding restaurant');
    }

    const result = await response.json();
    return result;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-200">
      <main className="mt-4 w-2/3 rounded bg-white p-10 shadow-lg">
        <form className="space-y-4">
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
        </form>
        <button
          className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() =>
            addRestaurant({
              _key: 'newKey',
              name: form.name,
              cuisine: form.cuisine,
            })
          }>
          Add Post
        </button>

        {restaurants.map((restaurant) => (
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
export default Page;
