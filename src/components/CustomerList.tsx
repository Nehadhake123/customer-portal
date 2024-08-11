import React from 'react';

interface Customer {
  id: number;
  name: string;
  desc: string;
}

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <div className="w-full sm:w-3/4 lg:w-1/3 bg-gray-900 text-white p-4 sm:p-2 md:p-4 h-full shadow-lg border border-gray-700">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold mb-2 mt-2 sm:mb-6 md:mb-4 lg:mb-10 text-gray-100">
        Customer List
      </h2>
      <ul className="flex-1 overflow-y-auto space-y-4 scrollbar-hidden">
        {customers.map(customer => (
          <li
            key={customer.id}
            className={`p-3 sm:p-4 md:p-5 lg:p-4 cursor-pointer rounded-lg border border-gray-600 transition-shadow transform hover:shadow-xl hover:scale-105 duration-300 ease-in-out ${selectedCustomerId === customer.id ? 'bg-gray-800 border-gray-400' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => onSelectCustomer(customer.id)}
          >
            <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 md:mb-3 lg:mb-4">{customer.name}</div>
            <div className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">{customer.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
