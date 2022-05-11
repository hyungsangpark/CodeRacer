import mongoose, {Document, Schema} from 'mongoose';

export interface IMatchHistory {
    users: number[];
}

export interface IMatchHistoryModel extends IMatchHistory, Document {
}

const MatchHistorySchema: Schema = new Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMatchHistoryModel>('MatchHistory', MatchHistorySchema);