import { Customer } from './customer';

export interface Order {
    id: number;
    customer: string;
    total: number;
    placed: Date;
    fulfilled: Date;
}
