import mongoose, {Document, Schema} from 'mongoose';

export interface IUser {
    name: string;
    profilePicture: string;
    avgStats: number[];
    matchHistories: number[];
}

export interface IUserModel extends IUser, Document {
}

const UserSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        profilePicture: {type: String},
        avgStats:
            {
                avgCPM: Number,
                avgAccuracy: Number,
                avgErrors: Number,
                victories: Number,
            },
        matchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MatchHistory",
            }
        ],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);