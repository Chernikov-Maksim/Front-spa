import { NextRequest, NextResponse } from "next/server";

import { isAuthorization } from "@/shared/api/auth";
import { routes } from "@/shared/constants/routes";

const GET = async (request: NextRequest) => {
    const { isAuth } = await isAuthorization(
        request.cookies.get("accessToken")?.value,
        request.cookies.get("refreshToken")?.value
    );

    if (!isAuth) {
        return NextResponse.json(
            {
                success: false,
                data: null,
            },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        const response = await fetch(
            `${process.env.DADATA_API_URL}${routes.dadata.suggestions}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.DADATA_API_KEY}`,
                    "X-Secret": process.env.DADATA_SECRET_KEY as string,
                },
                body: JSON.stringify({ query: query }),
            }
        );

        const data = await response.text();

        if (response.ok) {
            return NextResponse.json(
                { success: true, data: data },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                data: null,
                error: error.statusText,
            },
            { status: 500 }
        );
    }
};

export { GET };
