import { searchLocationByQuery } from "@/app/api/weatherApiClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const queryParam = req.nextUrl.searchParams.get("query");
  if (!queryParam) {
    return new NextResponse(null, {
      status: 400,
      statusText: '"query" parameter not provided',
    });
  }

  const locations = await searchLocationByQuery(queryParam);

  return NextResponse.json(locations);
}
