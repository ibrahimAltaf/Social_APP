import Post from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongodb/mongoose.js";

export const POST = async (req) => {
try {
    await connect();
    const feedPosts = await Post.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(feedPosts), { status: 200 });
} catch (error) {
    console.error("Error fetching posts:", error);
}
}