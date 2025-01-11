import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser } from "../../../lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {  // ✅ Fixed by changing to `POST`
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please provide a WEBHOOK_SECRET in your environment variables");
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_signature = headerPayload.get("svix-signature");
    const svix_timestamp = headerPayload.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
        throw new Error("Missing headers");
    }

    const payload = await req.json(); // ✅ Fixed payload parsing
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-signature": svix_signature,
            "svix-timestamp": svix_timestamp,
        });
    } catch (error) {
        console.error("Error verifying webhook", error);
        return new Response("Error verifying webhook", { status: 400 });
    }

    const { id } = evt?.data;
    const eventType = evt?.eventType;
    console.log(`Received ${eventType} webhook with id ${id}`);

    if (eventType === "user.created" || eventType === "user.updated") {
        const { first_name, last_name, image_url, email_addresses, username } = evt.data;
        try {
            const user = await createOrUpdateUser({
                id,
                first_name,
                last_name,
                image_url,
                email_addresses,
                username
            });

            if (user) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userMongoId: user._id,
                    },
                });
            }
        } catch (error) {
            console.error("Error handling webhook", error);
            return new Response("Error handling webhook", { status: 500 });
        }
    }

    return new Response("Webhook received", { status: 200 });
}
