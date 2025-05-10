import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const leagueId = process.env.NEXT_PUBLIC_SLEEPER_LEAGUE_ID;
  try {
    const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rosters' }, { status: 500 });
  }
}