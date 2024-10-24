import {createItem, getItem, getItemByName, getItems, deleteItem, updateItem} from "./ItemController";
import {Controller, Example, Get, Path, Route, Response, Tags, SuccessResponse, Post, Body, Delete} from "tsoa";
import {CreateItem, Item} from "./types";
import {ITEM_EXAMPLE} from "./constants";

@Route('item')
@Tags('Item')
class ItemController extends Controller {

    @Example<Item>(ITEM_EXAMPLE)
    @Response(400)
    @Response(404)
    @Response(500)
    @Get("/{id}")
    public async getItem(
        @Path() id: number
    ) {
        return await getItem(id);
    }

    @Example<Item[]>([ITEM_EXAMPLE])
    @Response(404)
    @Get("/")
    public async getItems() {
        return await getItems();
    }

    @Example<Item>(ITEM_EXAMPLE)
    @Response(404)
    @Response(400)
    @Get("/name/{name}")
    public async getItemByName(
        @Path() name: string,
    ) {
        return await getItemByName(name);
    }

    @Example<Item>(ITEM_EXAMPLE)
    @Response(400)
    @Response(500)
    @SuccessResponse(201,'Item created successfully.')
    @Post("/")
    public async createItem(
        @Body() newItem: CreateItem,
    ) {
        return await createItem(newItem);
    }

    @Example<Item>(ITEM_EXAMPLE)
    @Response(400)
    @Response(500)
    @SuccessResponse(204,'Item deleted successfully.')
    @Delete("/{id}")
    public async deleteItem(
        @Path() id: number
    ) {
        return await deleteItem(id);
    }
}

export default ItemController;