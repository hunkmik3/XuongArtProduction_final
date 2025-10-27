import { NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function GET(request) {
  try {
    const requestUrl = new URL(request.url);
    const projectType = requestUrl.searchParams.get('type'); // 'featured' or 'general'
    
    let strapiUrl = `${STRAPI_API_URL}/api/projects?populate=*`;
    
    // Filter by project type if specified
    if (projectType) {
      strapiUrl += `&filters[projectType][$eq]=${projectType}`;
    }
    
    // Sort by order field
    strapiUrl += '&sort=order:asc';

    const response = await fetch(strapiUrl, {
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
