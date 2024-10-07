CREATE SEQUENCE item_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."item" (
    "id" integer DEFAULT nextval('item_id_seq') NOT NULL,
    "name" text NOT NULL,
    "price" integer,
    "measure_unit" text,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "deleted_at" timestamptz,
    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE RULE "_soft_deletion_item" AS ON DELETE TO "item" DO INSTEAD (
  UPDATE item SET deleted_at = NOW() WHERE id = old.id AND deleted_at IS NULL
);

CREATE TRIGGER on_update_item BEFORE UPDATE ON item FOR EACH ROW EXECUTE PROCEDURE update_modified_column();