import {createCustomer, findCustomers, getCustomers} from "./CustomerController";
import {Controller, Get, Route, Path, Post, Body, SuccessResponse, Example, Tags} from "tsoa";
import {CreateCustomer, Customer} from "./types";
import {NEW_CUSTOMER_EXAMPLE} from "./constants";


@Route("customer")
@Tags('Customer')
class CustomerController extends Controller {

    @Get("/")
    public async getCustomers() {
        return await getCustomers();
    }

    @Get("/name/{name}")
    public async findCustomers(
        @Path() name: string,
    ) {
        return await findCustomers(name);
    }

    @Example<Customer>(NEW_CUSTOMER_EXAMPLE, "New customer")
    @Post("/")
    @SuccessResponse(
        "201",
        "Customer created",
    )
    public async createCustomer(@Body() customer: CreateCustomer) {
        return await createCustomer(customer);
    }
}

export default CustomerController;
