import Post from "../../../../lib/models/post.model"
import { connect } from "../../../../lib/mongodb/mongoose"
import { currentUser } from "@clerk/nextjs/server"

export const PUT = async (req) => {
    try {
        await connect()
        const user = await currentUser()
        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
        }

        const data = await req.json()
        const post = await Post.findById(data.postId)

        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found1" }), { status: 404 })
        }

        let updatedPost;
        if (post.likes.includes(user.publicMetadata.userMongoId)) {
            updatedPost = await Post.findByIdAndUpdate(
                data.postId, 
                { $pull: { likes: user.publicMetadata.userMongoId } },
                { new: true }
            )
        } else {
            updatedPost = await Post.findByIdAndUpdate(
                data.postId, 
                { $addToSet: { likes: user.publicMetadata.userMongoId } },
                { new: true }
            )
        }

        return new Response(JSON.stringify(updatedPost), { status: 200 })
    } catch (error) {
        console.error("Error liking post:", error)
        return new Response(JSON.stringify({ message: "Error liking post" }), { status: 500 })
    }
}
