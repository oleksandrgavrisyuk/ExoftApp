export class CreateOrderRequestModel {
  customerId: number;
  description: string;
  dishId: number;
  orderTime: string;
  items: OrderItemRequestModel [];
}

export class OrderItemRequestModel {
  dishId: number;
  quantity: number;
}

export class EditOrderRequestModel {
  id: number;
  description: string;
  dateOfOrder: string;
}
