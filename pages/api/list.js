import {connectToDatabase} from '../../lib/connectToDatabase';

export default async function handler(request, response) {
  try {
    const {mongoClient} = await connectToDatabase();

    const db = mongoClient.db('sample_restaurants');
    const collection = db.collection('restaurants');
    const result = await collection
      .find({})
      .project({
        grades: 0,
        _id: 0,
        borough: 0,
      })
      .limit(4)
      .toArray();
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(500).json({message: 'error connecting to db', err});
  }
}
