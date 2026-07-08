import { useQuery } from '@tanstack/react-query';

import ApiService from '../services/Services';

async function getAllInvoices() {
  const responseData = await ApiService.getAllInvoices();
  return responseData;
}

function useInvoices() {
  const {
    isLoading,
    isError,
    data: invoices,
  } = useQuery({
    queryFn: getAllInvoices,
    queryKey: ['invoices'],
  });

  return [invoices, isLoading, isError] as const;
}

export default useInvoices;
