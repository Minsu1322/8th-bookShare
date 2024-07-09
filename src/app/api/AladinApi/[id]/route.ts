import { NextResponse } from 'next/server';

const TTB_KEY = 'ttbright15321141655001';

export const GET = async (request: Request) => {
  try {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTB_KEY}&QueryType=Bestseller&SearchTarget=Book&Output=js&Version=20240701`
    );
    console.log(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
};
