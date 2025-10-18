// b_path:: src/types/schemas.ts
import { z } from "zod";

/**
 * Zod-First Class Schema Examples
 *
 * This file demonstrates the Zod-First Class pattern for schema-driven development.
 * All schemas are defined first, then types are derived using z.infer<typeof Schema>.
 */

// ==================== Basic Schemas ====================

/**
 * User status enumeration schema
 */
export const UserStatusSchema = z.enum(["active", "inactive", "pending", "suspended"]);

/**
 * User role schema with union type
 */
export const UserRoleSchema = z.enum(["admin", "moderator", "user", "guest"]);

/**
 * Email validation schema
 */
export const EmailSchema = z.string().email("Invalid email format");

/**
 * Phone number schema (basic validation)
 */
export const PhoneSchema = z.string().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number format");

// ==================== Complex Object Schemas ====================

/**
 * User profile schema - demonstrates nested objects and optional fields
 */
export const UserProfileSchema = z.object({
	id: z.number().positive("ID must be positive"),
	email: EmailSchema,
	firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
	lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
	status: UserStatusSchema,
	role: UserRoleSchema,
	avatar: z.string().url("Avatar must be a valid URL").optional(),
	phone: PhoneSchema.optional(),
	createdAt: z.string().datetime("Invalid creation date"),
	updatedAt: z.string().datetime("Invalid update date"),
	preferences: z
		.object({
			theme: z.enum(["light", "dark", "auto"]).default("auto"),
			notifications: z.boolean().default(true),
			language: z.string().default("en"),
		})
		.optional(),
});

/**
 * Address schema - demonstrates optional nested objects
 */
export const AddressSchema = z.object({
	street: z.string().min(1, "Street address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(2, "State must be at least 2 characters").max(50, "State too long"),
	zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
	country: z.string().length(2, "Country must be 2-letter code (e.g., US, CA)"),
});

/**
 * Complete user schema with optional address
 */
export const UserSchema = UserProfileSchema.extend({
	addresses: z.array(AddressSchema).optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

// ==================== API Schemas ====================

/**
 * Pagination parameters schema
 */
export const PaginationParamsSchema = z.object({
	page: z.number().min(1, "Page must be at least 1").default(1),
	limit: z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(10),
	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

/**
 * API response wrapper schema
 */
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
	z.object({
		data: dataSchema,
		message: z.string().optional(),
		success: z.boolean(),
		timestamp: z.string().datetime(),
		errors: z.array(z.string()).optional(),
	});

// ==================== Utility Schemas ====================

/**
 * Range schema for numeric validation
 */
export const RangeSchema = (min: number, max: number) =>
	z.number().min(min, `Value must be at least ${min}`).max(max, `Value must be at most ${max}`);

/**
 * Non-empty string schema
 */
export const NonEmptyStringSchema = z.string().min(1, "String cannot be empty");

/**
 * UUID schema
 */
export const UUIDSchema = z.string().uuid("Invalid UUID format");

/**
 * URL schema with optional protocol validation
 */
export const URLSchema = z.string().url("Invalid URL format");

// ==================== Derived Types (Zod-First) ====================

/**
 * All types are derived from schemas using z.infer
 * This ensures type safety and consistency with runtime validation
 */

// Basic derived types
export type UserStatus = z.infer<typeof UserStatusSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Phone = z.infer<typeof PhoneSchema>;

// Complex object types
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type User = z.infer<typeof UserSchema>;

// API types
export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
export type ApiResponse<T> = {
	data: T;
	message?: string;
	success: boolean;
	timestamp: string;
	errors?: string[];
};

// Utility types
export type Range = z.infer<ReturnType<typeof RangeSchema>>;
export type NonEmptyString = z.infer<typeof NonEmptyStringSchema>;
export type UUID = z.infer<typeof UUIDSchema>;
export type URL = z.infer<typeof URLSchema>;

// ==================== Schema Exports for Consumers ====================

/**
 * Export schemas for runtime validation
 * Consumers can use these for their own validation needs
 */
export {
	UserStatusSchema as userStatusSchema,
	UserRoleSchema as userRoleSchema,
	EmailSchema as emailSchema,
	PhoneSchema as phoneSchema,
	UserProfileSchema as userProfileSchema,
	AddressSchema as addressSchema,
	UserSchema as userSchema,
	PaginationParamsSchema as paginationParamsSchema,
	ApiResponseSchema as apiResponseSchema,
	RangeSchema as rangeSchema,
	NonEmptyStringSchema as nonEmptyStringSchema,
	UUIDSchema as uuidSchema,
	URLSchema as urlSchema,
};

// ==================== Validation Helper Functions ====================

/**
 * Type-safe validation helper
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Parsed data or throws validation error
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
	return schema.parse(data);
}

/**
 * Safe validation helper (doesn't throw)
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Result object with success/error
 */
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown) {
	const result = schema.safeParse(data);
	return result;
}

/**
 * Create API response schema for specific data type
 * @param dataSchema - Schema for the response data
 * @returns Complete API response schema
 */
export function createApiResponseSchema<T extends z.ZodType>(dataSchema: T) {
	return ApiResponseSchema(dataSchema);
}
