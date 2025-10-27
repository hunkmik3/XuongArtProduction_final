import { NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectType = searchParams.get('type'); // 'featured' or 'general'
    
    let url = `${STRAPI_API_URL}/api/projects?populate=*`;
    
    // Filter by project type if specified
    if (projectType) {
      url += `&filters[projectType][$eq]=${projectType}`;
    }
    
    // Sort by order field
    url += '&sort=order:asc';

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects from Strapi');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
