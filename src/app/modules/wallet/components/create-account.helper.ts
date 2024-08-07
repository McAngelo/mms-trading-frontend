interface ICreateAccount {
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
  fundWallet: '1000' | '10000' | '100000' | '1000000';
}

const inits: ICreateAccount = {
  nameOnCard: 'Kofi Manu',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '1',
  cardExpiryYear: '2',
  cardCvv: '123',
  saveCard: '0',
  fundWallet: '1000',
};

export { ICreateAccount, inits };
