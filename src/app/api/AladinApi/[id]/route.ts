import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop() || '';

  const ttbKey = 'ttbright15321141655001';
  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN&ItemId=${id}&output=js&Cover=Big&Version=20131101&OptResult=ebookList,usedList,reviewList`;

  try {
    const response = await fetch(apiUrl);
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
