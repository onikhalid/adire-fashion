import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui"
import { TProduct } from "./FeaturedProductsSection"
import FeaturedProductCard from "./FeaturedProductCard";


interface ProductsComponentProps {
    products: TProduct[]
}


const FeaturedProductsList: React.FC<ProductsComponentProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState("8");
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    };
    // const [products, setProducts] = useState<Product[]>(products);
    const indexOfLastItem = useMemo(() => currentPage * parseInt(itemsPerPage), [currentPage, itemsPerPage]);
    const indexOfFirstItem = useMemo(() => indexOfLastItem - parseInt(itemsPerPage), [indexOfLastItem, itemsPerPage]);
    const currentItems = useMemo(() => products.slice(indexOfFirstItem, indexOfLastItem), [products, indexOfFirstItem, indexOfLastItem]);
    const totalPages = useMemo(() => Math.ceil(products.length / parseInt(itemsPerPage)), [products.length, itemsPerPage]);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const totalPageButtons = 7;

        if (totalPages <= totalPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            if (currentPage > 3) {
                pageNumbers.push('...');
            }

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(currentPage + 1, totalPages - 1);
            if (start === 2) end = 4;
            if (end === totalPages - 1) start = totalPages - 3;
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }


            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };



    return (
        <section className="pt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {
                    currentItems.map((product) => (
                        <FeaturedProductCard key={product.id} product={product} />
                    ))
                }
            </div>

            <footer className="flex items-center justify-center gap-4 flex-wrap text-sm py-8">
                <div className="flex items-center gap-4 flex-wrap text-sm">
                    <label className="max-md:hidden">Products per page: </label>
                    <Select value={itemsPerPage} onValueChange={(newValue) => setItemPerPage(newValue)} >
                        <SelectTrigger className="w-[60px]">
                            <SelectValue defaultValue="10" placeholder="Select items per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Repos per page:</SelectLabel>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-4 flex-wrap text-sm">
                    <label>Page: </label>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft />
                    </button>
                    <div className="flex items-center gap-1">
                        {generatePageNumbers().map((pageNumber, index) => (
                            <React.Fragment key={index}>
                                {
                                    pageNumber === '...' ? (
                                        <span className="px-2 py-1">...</span>
                                    )
                                        :
                                        (
                                            <button
                                                onClick={() => handlePageChange(parseInt(pageNumber.toString()))}
                                                className={`px-2 py-1 text-sm transition-colors duration-300 ${currentPage !== pageNumber ? 'bg-background text-foreground' : 'bg-gray-200 text-background'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        )
                                }
                            </React.Fragment>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 1 || totalPages === 0 || currentItems.length === 0}
                        className="px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </footer>
        </section >
    )
}

export default FeaturedProductsList 