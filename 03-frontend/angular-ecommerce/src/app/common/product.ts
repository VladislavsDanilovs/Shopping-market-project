export class Product {
    sku: string = '';
    name: string = '';
    description: string = '';
    unitPrice: number = 0;
    imageUrl: string = '';
    action: boolean = false;
    unitsInStock: number = 0;
    dateCreated: Date | undefined;
    lastUpdated: Date | undefined;
    id: number = 0;
}
