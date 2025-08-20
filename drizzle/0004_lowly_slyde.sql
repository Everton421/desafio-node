ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_userId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;