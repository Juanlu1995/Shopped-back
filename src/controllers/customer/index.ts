import {createCustomer, findCustomers, getCustomers} from "./CustomerController";
import {Controller, Get, Route, Path, Post, Body, SuccessResponse, Example, Tags} from "tsoa";
import {CreateCustomer, Customer} from "./types";
import {NEW_CUSTOMER_EXAMPLE} from "./constants";

@Route("customer")
@Tags('Customer')
class CustomerController extends Controller {
    /**
     * Get all customers.
     */
    @Get("/")
    public async getCustomers(): Promise<Customer[] > {
        return await getCustomers();
    }

    /**
     * Get all customers that match name
     * @param {string} name Name of the customer to search
     */
    @Get("/name/{name}")
    public async findCustomers(
        @Path() name: string,
    ): Promise<Customer[]> {
        return await findCustomers(name);
    }

    /**
     * Create a customer
     * @param customer {CreateCustomer} Customer data to be created
     */
    @Post("/")
    @Example<Customer>(NEW_CUSTOMER_EXAMPLE, "New customer")
    @SuccessResponse(
        "201",
        "Customer created",
    )
    public async createCustomer(@Body() customer: CreateCustomer): Promise<Customer | null> {
        return await createCustomer(customer);
    }
}

export default CustomerController;
