import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function GET() {
  try {
    console.log('🔍 Image Projects API: Fetching image projects...');
    
    const response = await fetch(`${STRAPI_URL}/api/image-projects?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for development
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📊 Image Projects API response:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching image projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image projects' },
      { status: 500 }
    );
  }
}
