import mongoose, { Schema } from "mongoose";

export interface IAudio {
  fileSource: string; // Amazon S3 URL
  fileName: string;
  createdAt: Date;
}

export interface IConversation {
  date: Date;
  conversationExchanges: IConversationExchange[];
}
export interface IConversationExchange {
  german: string;
  englishTranslation: string;
  audioRef: Schema.Types.ObjectId;
}
const ConversationSchema = new Schema<IConversation>(
  {
    date: { type: Date },
    conversationExchanges: [{ ref: "ConversationExchange" }],
  },
  {
    timestamps: true,
  },
);

const ConversationExchangeSchema = new Schema<IConversationExchange>({
  german: { type: String, required: true },
  englishTranslation: { type: String, required: true },
  audioRef: { type: Schema.Types.ObjectId, ref: "Audio" },
});

const Audio = new Schema<IAudio>({
  fileSource: { type: String, required: true },
  fileName: { type: String, required: true },
  createdAt: { type: Date },
});

const conversation = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema,
);
const conversationExchange = mongoose.model<IConversationExchange>(
  " ConversationExchange",
  ConversationExchangeSchema,
);
