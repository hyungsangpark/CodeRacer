import mongoose, {Document, Schema} from 'mongoose';

export interface IExample {
    name: string;
}

export interface IExampleModel extends IExample, Document {
}

const ExampleSchema: Schema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IExampleModel>('Example', ExampleSchema);