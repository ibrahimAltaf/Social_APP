import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser } from "./../../../lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please provide a WEBHOOK_SECRET in your environment variables");
    }

    // Get the Headers 
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_signature = headerPayload.get("svix-signature");
    const svix_timestamp = headerPayload.get("svix-timestamp");

    // if there are no headers error out
    if (!svix_id || !svix_signature || !svix_timestamp) {
        throw new Error("Missing headers");
    }

    // Get the body
    const payload = await req.body;
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret
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
    console.log("Webhook body", body);

    if (eventType === "user.created" || eventType === "user.updated") {
        const { first_name, last_name, image_url, email_addresses, username } = evt.data;

        try {
            const user = await createOrUpdateUser(
                id,
                first_name,
                last_name,
                image_url,
                email_addresses,
                username
            );

            if (user && eventType === "user.created") {
                try {
                    await clerkClient.users.updateUserMetadata(id, {
                        publicMetadata: {
                            userMongoId: user._id, // Fixed the period issue here
                        },
                    });
                } catch (error) {
                    console.error("Error updating user metadata", error);
                }
            }
        } catch (error) {
            console.error("Error creating or updating user", error);
            return new Response("Error creating or updating user", { status: 500 });
        }
    }
    

    return new Response("Webhook processed successfully", { status: 200 });
}
