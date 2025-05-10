import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  const { season } = params;
  const userId = process.env.NEXT_PUBLIC_SLEEPER_USER_ID;
  if (!userId) {
    return NextResponse.json({ error: 'User ID not configured' }, { status: 400 });
  }
  try {
    const response = await axios.get(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${season}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error fetching leagues for ${season}:`, error.message);
    return NextResponse.json({ error: 'Failed to fetch leagues' }, { status: 500 });
  }
}