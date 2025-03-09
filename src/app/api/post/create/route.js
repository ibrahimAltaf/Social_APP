import Post from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongodb/mongoose.js";
import { currentUser } from "@clerk/nextjs/server";

export  const POST = async(req) => {
    const user = await currentUser(req);
    try {
        await connect();
        const data = await req.json();
console.log("Received Data:", data); 
        if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const newPost = await Post.create({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,
        });

        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 200 });
    }catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
}

}
