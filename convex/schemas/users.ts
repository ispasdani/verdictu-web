import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  clerkId: v.string(),
  email: v.string(),
  imageUrl: v.optional(v.string()),
  name: v.string(),
  subscriptionTier: v.union(
    v.literal("free"),
    v.literal("premium"),
    v.literal("business"),
  ),
  jurisdiction: v.optional(v.string()),
  credits: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_clerkId", ["clerkId"])
  .index("by_email", ["email"]);
