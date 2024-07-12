import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryType: string | null = searchParams.get('QueryType');
  const page: string | null = searchParams.get('page');
  const TTB_KEY: string = 'ttbright15321141655001';

  let API_URL: string = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTB_KEY}&QueryType=${queryType}&SearchTarget=Book&Start=${page}&MaxResults=10&Cover=Big&Output=js&Version=20131101`;

  if (queryType === 'ItemEditorChoice') {
    const categoryId = searchParams.get('CategoryId');
    API_URL = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTB_KEY}&QueryType=${queryType}&SearchTarget=Book&Start=${page}&MaxResults=50&CategoryId=${categoryId}&Cover=Big&Output=js&Version=20131101`;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
