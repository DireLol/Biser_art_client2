import { makeAutoObservable } from "mobx";
import AdminStore from "./AdminStore";

export interface FilterOptionsState {
    name: string;
    price: number;
    jewelryStructureId: number;
    productTypeId: number;
    beadTypeId: number;
    jewelryStyleId: number;
    jewelryColorId: number;
}

export default class ProductStore {
    adminStore: AdminStore;
    searchQuery: string = '';
    
    filterOptions: FilterOptionsState = {
        name: '',
        price: 0,
        jewelryStructureId: 0,
        productTypeId: 0,
        beadTypeId: 0,
        jewelryStyleId: 0,
        jewelryColorId: 0,
    };

    constructor(adminStore: AdminStore) {
        this.adminStore = adminStore;
        makeAutoObservable(this);
    }

    setFilterOptions(options: FilterOptionsState) {
        this.filterOptions = options;
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    get filteredProducts() {
        const query = this.searchQuery.toLowerCase();

        if (query === '') {
            return this.adminStore.products;
        }

        return this.adminStore.products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.color.toLowerCase().includes(query) ||
            product.style.toLowerCase().includes(query)
        );
    }

    resetFilterOptions() {
        this.filterOptions = {
            name: '',
            price: 0,
            jewelryStructureId: 0,
            productTypeId: 0,
            beadTypeId: 0,
            jewelryStyleId: 0,
            jewelryColorId: 0,
        };
    }
}