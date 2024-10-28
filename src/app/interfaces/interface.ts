export interface Payment  { 
    amount: number
    cardNumber: string
    validity: string,
    cardHolder: string,
    cvv: number
    receiptNumber?: number
    operation?: 'Pay' | 'Reject'
  }

