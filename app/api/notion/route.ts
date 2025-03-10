import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';
import { env } from '@/env';

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const notion = new Client({ auth: env.NOTION_SECRET });
    const response = await notion.pages.create({
      parent: {
        database_id: `${env.NOTION_DB}`,
      },
      properties: {
        Email: {
          type: 'email',
          email: body?.email,
        },
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: body?.name,
              },
            },
          ],
        },
      },
    });

    if (!response) {
      throw new Error('Failed to add email to Notion');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
