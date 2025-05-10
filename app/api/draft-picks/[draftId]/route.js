import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  const { draftId } = params;
  try {
    const response = await axios.get(`https://api.sleeper.app/v1/draft/${draftId}/picks`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching draft picks:', error.message);
    return NextResponse.json({ error: 'Failed to fetch draft picks' }, { status: 500 });
  }
}