import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/data/current-profile";
import { NextResponse } from "next/server";

import * as z from "zod";
import { ChannelType, MemberRole } from "@/generated/prisma";

export async function POST(req: Request) {
  const formSchema = z.object({
    name: z.string().min(3, {
      error: "Server name is required",
    }),
    imageUrl: z.string().min(3, {
      error: "Server image is required",
    }),
  });

  try {
    const rawData = await req.json();
    const validatedFields = formSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name: validatedFields.data.name,
        imageUrl: validatedFields.data.imageUrl,
        inviteCode: uuidv4(),
        channels: { create: [{ name: "general", type: ChannelType.TEXT }] },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_POST]: ", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
