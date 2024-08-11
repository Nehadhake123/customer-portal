import React, { useEffect, useState } from 'react';

interface CustomerDetailsProps {
  customer: {
    name: string;
    desc: string;
    address: string;
  } | null;
}

// Function to fetch a set of photos from Unsplash
const fetchPhotos = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://api.unsplash.com/photos?page=1&query=random&client_id=1wAlbFSNRo6wESxl0z_VJUpag8VSXXRMzBvxr0IPpFY');
    
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }

    const data = await response.json();
    return data.slice(0, 9).map((photo: { urls: { small: string } }) => photo.urls.small);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [shuffledPhotos, setShuffledPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const initializePhotos = async () => {
    const storedPhotos = localStorage.getItem('photos');

    if (storedPhotos) {
      const parsedPhotos = JSON.parse(storedPhotos);
      setPhotos(parsedPhotos);
      setShuffledPhotos(parsedPhotos);
    } else {
      try {
        const newPhotos = await fetchPhotos();
        if (newPhotos.length === 0) {
          setError('Failed to load photos. Please try again later.');
        } else {
          setPhotos(newPhotos);
          setShuffledPhotos(newPhotos);
          localStorage.setItem('photos', JSON.stringify(newPhotos));
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        setError('Failed to load photos. Please try again later.');
      }
    }
  };

  useEffect(() => {
    initializePhotos();
  }, [customer]); // Fetch new photos when customer changes

  useEffect(() => {
    if (photos.length === 0) return;

    // Set up interval to shuffle images every 10 seconds
    const interval = setInterval(() => {
      setShuffledPhotos((prevPhotos) => shuffleArray([...prevPhotos]));
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [photos]);

  if (!customer) {
    return (
      <div className="w-full p-8 flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Select a customer to view details.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8 bg-gradient-to-r from-gray-50 to-white">
      <div className="md:mx-10 sm:mx-2 max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{customer.name}</h2>
          <h3 className=" sm:text-sm md:text-xl font-semibold text-gray-700 mb-6">{customer.desc}</h3>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow-md">
            <p>{error}</p>
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {shuffledPhotos.length > 0 && shuffledPhotos.map((photo, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={photo}
                alt={`photo ${index}`}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
