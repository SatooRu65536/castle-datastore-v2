CREATE TABLE `castle_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`castle_id` text NOT NULL,
	`name` text NOT NULL,
	`aka` text DEFAULT '[]' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`structures` text DEFAULT '[]' NOT NULL,
	`description` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`editor_user_id` text NOT NULL,
	`scale` integer DEFAULT 0 NOT NULL,
	`deleted` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `castles` (
	`id` text PRIMARY KEY NOT NULL,
	`latest_version_id` text NOT NULL,
	FOREIGN KEY (`latest_version_id`) REFERENCES `castle_versions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `structures` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`sub` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
