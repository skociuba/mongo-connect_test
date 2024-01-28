import {connectToDatabase} from '../../lib/connectToDatabase';

export default async function handler(request, response) {
  const {mongoClient} = await connectToDatabase();
  const db = mongoClient.db('blog');
  const collection = db.collection('blog');

  if (request.method === 'POST') {
    // Dodawanie nowej restauracji
    const newRestaurant = request.body;
    try {
      const result = await collection.insertOne(newRestaurant);
      response
        .status(200)
        .json({message: 'Restaurant added successfully', result});
    } catch (err) {
      console.log(err);
      response.status(500).json({message: 'Error adding restaurant', err});
    }
  } else if (request.method === 'GET') {
    // Pobieranie restauracji
    try {
      const result = await collection
        .find({})
        .project({
          grades: 0,
          _id: 0,
          borough: 0,
        })

        .toArray();
      response.status(200).json(result);
    } catch (err) {
      console.log(err);
      response.status(500).json({message: 'Error connecting to db', err});
    }
  } else {
    // Obsługa innych metod HTTP
    response.status(405).json({message: 'Method not allowed'});
  }
}
