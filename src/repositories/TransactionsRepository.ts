import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.getTotal({ type: 'income' });

    const totalOutcome = this.getTotal({ type: 'outcome' });

    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private getTotal({ type }: Pick<Transaction, 'type'>): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((total, value) => total + value, 0);
  }
}

export default TransactionsRepository;
