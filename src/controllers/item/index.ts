import {createItem, getItem, getItemsByName, getItems, deleteItem, updateItem,} from "./ItemController";
import {Controller, Example, Get, Path, Route, Response, Tags, SuccessResponse, Post, Body, Delete, Query} from "tsoa";
import {CreateItem, DBItem, Item} from "./types";
import {ITEM_EXAMPLE} from "./constants";

@Route('item')
@Tags('Item')
class ItemController extends Controller {

    /**
     * Get all items
     */
    @Example<Item[]>([ITEM_EXAMPLE])
    @Response(404, 'Returned when non items are found')
    @Get("/")
    public async getItems(): Promise<DBItem[] | null> {
        return await getItems();
    }

    /**
     * Get item by id
     * @param id {number} id for which the item is to be searched
     * @param withDeleted {boolean|undefined} Query boolean param if include in search deleted items. Default false if not included.
     */
    @Example<Item>(ITEM_EXAMPLE)
    @Response(400, 'Returned when id is not passed by path')
    @Response(404, 'Returned when non item is found')
    @Response(500, "Any other unexpected error")
    @Get("/{id}")
    public async getItem(
        @Path() id: number,
        @Query() withDeleted?: boolean,
    ): Promise<DBItem | null> {
        return await getItem(id, withDeleted);
    }

    /**
     * Get all the items that match the name
     * @param name {string} Name of the items for which the items have to be searched
     * @param withDeleted {boolean|undefined} Query boolean param if include in search deleted items. Default false if not included.
     */
    @Example<Item>(ITEM_EXAMPLE)
    @Response(400, 'Returned when id is not passed by path')
    @Response(404, 'Returned when non item is found')
    @Get("/name/{name}")
    public async getItemsByName(
        @Path() name: string,
        @Query() withDeleted?: boolean,
    ): Promise<DBItem[] | null> {
        return await getItemsByName(name, withDeleted);
    }

    /**
     * Create a new item
     * @param newItem {CreateItem} Item to create
     */
    @Example<Item>(ITEM_EXAMPLE)
    @Response(400, 'Returned when name is not passed by path')
    @Response(500, 'Returned when any unknown error')
    @SuccessResponse(201, 'Item created successfully.')
    @Post("/")
    public async createItem(
        @Body() newItem: CreateItem,
    ): Promise<DBItem | null> {
        return await createItem(newItem);
    }

    /**
     * Delete an item that is not deleted.
     * Does a soft reboot setting deleted_at to the current date.
     * @param id {number} id of the item to be deleted
     */
    @Example<Item>(ITEM_EXAMPLE)
    @Response(400, 'Returned when id is not passed by path')
    @Response(500, 'Returned when any unknown error')
    @SuccessResponse(204, 'Item deleted successfully.')
    @Delete("/{id}")
    public async deleteItem(
        @Path() id: number
    ): Promise<boolean> {
        return await deleteItem(id);
    }
}

export default ItemController;