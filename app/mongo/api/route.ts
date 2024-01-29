import {NextResponse} from 'next/server';

import {connectToDatabase} from '../../../lib/connectToDatabase';

export async function GET() {
  const {mongoClient} = await connectToDatabase();
  const db = mongoClient.db('blog');
  const collection = db.collection('blog');
  try {
    const contacts = await collection
      .find({})
      .project({
        grades: 0,
        _id: 0,
        borough: 0,
      })

      .toArray();
    return NextResponse.json({
      data: contacts,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({msg: ['Unable to fetch contacts.']});
  }
}

export async function POST(request: Request) {
  const {mongoClient} = await connectToDatabase();
  const db = mongoClient.db('blog');
  const collection = db.collection('blog');

  const newContact = await request.json();

  try {
    const result = await collection.insertOne(newContact);

    return NextResponse.json({
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Unable to add contact',
    });
  }
}
