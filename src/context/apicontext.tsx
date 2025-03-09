import React, { createContext, ReactNode, useContext, useState } from "react";

interface QueryResult<T> {
    data: T[] | undefined;
    isLoading: boolean;
    error: Error | null;
  }
  interface PaginatedQueryResult<T> extends QueryResult<T> {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    refetch: () => void;
  }
interface AllContextType {
  
  }
  const DataContext = createContext<AllContextType | undefined>(undefined);
  interface ProductProviderProps {
    children: ReactNode;
    limit?: number;
  }

  export const APIProvider: React.FC<ProductProviderProps> = ({ children, limit = 10 }) => {
    // const token = getToken();
    // const [page, setPage] = useState(1);
    // const [userPage, setUserPage] = useState(1);
    // const [productPage, setProductPage] = useState(1);
    // const [subcategoryPage, setSubcategoryPage] = useState(1);
    // const [orderPage, setOrderPage] = useState(1);
    // const [transactionPage, setTransactionPage] = useState(1);
    // const [contactus,setContactus]=useState(1);


 
    
  const value={limit}
  
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
  };
  
  export const useAPI = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
      throw new Error("useAPI must be used within a ProductProvider");
    }
    return context;
  };
