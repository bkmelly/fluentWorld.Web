import { Transaction } from '../../types/dashboard'
import { FiClock, FiCheck, FiX } from 'react-icons/fi'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date(),
    amount: 999,
    type: 'program',
    itemName: 'Web Development Bootcamp',
    customerName: 'John Doe',
    status: 'completed'
  },
  // Add more mock transactions...
]

const TransactionList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <button className="text-sm text-primary hover:text-primary/80">
          View All
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {transaction.customerName}
                </h3>
                <p className="text-sm text-gray-500">{transaction.itemName}</p>
                <span className="text-xs text-gray-400">
                  {transaction.date.toLocaleDateString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">
                  ${transaction.amount}
                </span>
                <div className={`
                  text-xs mt-1 flex items-center justify-end gap-1
                  ${transaction.status === 'completed' ? 'text-green-500' : 
                    transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}
                `}>
                  {transaction.status === 'completed' ? <FiCheck /> :
                   transaction.status === 'pending' ? <FiClock /> : <FiX />}
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList 