import React from 'react';
import { Checkbox } from "../ui";

interface FilterComponentProps {
    setFilterUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const FeaturedProductsFilter: React.FC<FilterComponentProps> = ({ setFilterUrl }) => {
    const handleCheckboxChange = (checked: boolean | string, name: string) => {
        setFilterUrl((prevUrl) => {
            if (checked) {
                return prevUrl ? `${prevUrl}&${name}` : `?${name}`;
            } else {
                return prevUrl?.replace(`&${name}`, '').replace(`?${name}`, '') || null;
            }
        });
    };

    return (
        <article className='sticky top-[10rem] max-h-[400px]'>
            <h3>Filter</h3>
            <div className="space-y-2">

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="male"
                            onCheckedChange={(checked) => handleCheckboxChange(checked, "size=MALE")}
                        />
                        <label
                            htmlFor="male"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Male
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="female"
                            onCheckedChange={(checked) => handleCheckboxChange(checked, "size=FEMALE")}
                        />
                        <label
                            htmlFor="female"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Female
                        </label>
                    </div>
            </div>
        </article>
    );
};

export default FeaturedProductsFilter;