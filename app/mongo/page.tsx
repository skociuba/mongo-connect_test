'use client';
import {useState, useEffect} from 'react';

interface Restaurant {
  _key: string;
  name: string;
  cuisine: string;
}

export default function Home() {
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
    <div className="container">
      <main>
        <form>
          <label>
            name:
            <input
              onChange={(e) => onChange(e)}
              value={form.name}
              type="text"
              name="name"
            />
          </label>
          <label>
            cuisine:
            <input
              onChange={(e) => onChange(e)}
              value={form.cuisine}
              type="text"
              name="cuisine"
            />
          </label>
        </form>
        <button
          onClick={() =>
            addRestaurant({
              _key: 'newKey',
              name: form.name,
              cuisine: form.cuisine,
            })
          }>
          Add Restaurant
        </button>

        {restaurants.map((restaurant) => (
          <div key={restaurant._key}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.cuisine}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
