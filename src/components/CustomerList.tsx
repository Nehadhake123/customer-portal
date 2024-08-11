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
    <div className="w-1/3 bg-gray-900 text-white p-6 flex flex-col h-full shadow-lg border border-gray-700">
  <h2 className="text-3xl text-center font-semibold mb-8 text-gray-100">
    Customer List
  </h2>
  <ul className="flex-1 overflow-y-auto space-y-4 h-full">
    {customers.map(customer => (
      <li
        key={customer.id}
        className={`p-6 cursor-pointer rounded-lg border border-gray-600 transition-shadow transform hover:shadow-xl hover:scale-105 duration-300 ease-in-out ${selectedCustomerId === customer.id ? 'bg-gray-800 border-gray-400' : 'bg-gray-700 hover:bg-gray-600'}`}
        onClick={() => onSelectCustomer(customer.id)}
      >
        <div className="font-semibold text-lg mb-2">{customer.name}</div>
        <div className="text-gray-300 text-sm">{customer.desc}</div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default CustomerList;
