import User from "../models/user.modal";
import { connect } from "../mongodb/mongoose";
export const CreateOrUpdateUser = async (id, first_name, last_name, image_url, email_addresses, username) => {
    try {
        await connect();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    avatar: image_url,  // Fixed field name
                    email: email_addresses?.length > 0 ? email_addresses[0].email_address : null, // Fixed email handling
                    username: username
                }
            },
            { new: true, upsert: true }
        );

        return user;
    } catch (error) {
        console.error("Error creating or updating user:", error);
        throw error;
    }
};


connect()