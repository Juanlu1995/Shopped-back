CREATE SEQUENCE customer_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."customer" (
    "id" integer DEFAULT nextval('customer_id_seq') NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "deleted_at" timestamptz,
    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE RULE "_soft_deletion_customer" AS ON DELETE TO "customer" DO INSTEAD (
  UPDATE customer SET deleted_at = NOW() WHERE id = old.id AND deleted_at IS NULL
);

CREATE TRIGGER on_update_customer BEFORE UPDATE ON customer FOR EACH ROW EXECUTE PROCEDURE update_modified_column();