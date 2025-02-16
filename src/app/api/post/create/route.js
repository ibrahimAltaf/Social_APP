import Post from "../../../../lib/models/post.model.js"
import {connect} from "../../../../lib/mongodb/mongoose.js"
import {currentUser} from "@clerk/nextjs/server"

export default  POST = async (req)=>{
    const user = await currentUser(req)
    try {
        if(!user || user.publicMetadata.userMongoId !== data.userMongoId){
            return new Response ('Unauthorized',{
                status: 401
            })
        
        }
        const newPost = await Post.create({
            user:data.userMongoId,
            name:data.name,
            username:data.username,
            text:data.text,
            profileImg:data.profileImg,
            image:data.image
        })
        await newPost.save()
        return {
            status: 200,
            body: JSON.stringify(newPost)
        }
    } catch (error) {
        console.log (error) 
        return new Response ('Internal Server Error',{
            status: 500
        })
    }
}