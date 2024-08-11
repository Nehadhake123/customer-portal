import React, { useEffect, useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

interface Customer {
  id: number;
  name: string;
  desc: string;
  address: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/customers.json'); // Ensure the path is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text(); // Read response as text
        console.log('Response text:', text); // Log the raw response text for debugging
        const data: Customer[] = JSON.parse(text); // Parse text as JSON
        setCustomers(data);
      } catch (error) {
        setError('Failed to load customers');
        console.error('Error loading customers:', error); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId) || null;

  return (
    <div className="flex h-screen bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full text-gray-700">Loading...</div>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-full text-red-500">{error}</div>
      ) : (
        <>
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
          />
          <CustomerDetails customer={selectedCustomer} />
        </>
      )}
    </div>
  );
};

export default App;
