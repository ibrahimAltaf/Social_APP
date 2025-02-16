import Post from "@/lib/models/post.model";  // Ensure correct import path
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        await connect();
        const user = await currentUser();

        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();

        if (user.publicMetadata.userMongoId !== data.userMongoId) {
            return new Response("Forbidden", { status: 403 });
        }

        const newPost = await Post.create({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,
        });

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error creating post:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
