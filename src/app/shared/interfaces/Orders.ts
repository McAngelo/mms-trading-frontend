export interface GetOrdersDto {
    id: number,
    side: string;
    quantity: number;
    price: number; 
    orderStatus: string;
    ticker: string;
    orderType: string;
    status: string; 
    dateCreated: string; 
  }