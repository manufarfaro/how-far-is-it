import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, FormControl, Text, IconButton, InputGroup, InputRightElement, HStack } from "@chakra-ui/react";
import { FC, useState, useCallback } from "react";
import { SelectDropdownCity } from "../models/SelectDropdownCity";
import Select from 'react-select';
type IntermediateCitiesFormControlParams = {
    cities: string[],
    onChange: (newValue: {value: string, label: string}[]) => void
};

const IntermediateCitiesFormControl: FC<IntermediateCitiesFormControlParams> = ({ cities, onChange }) => {
    const [citiesList, setCitiesList] = useState<{value: string, label: string}[]>([]);
    const [citiesSelection, _] = useState(cities);

    const addCityForm = useCallback(() => {
        setCitiesList([...citiesList, { label: "", value: "" }]);
        onChange(citiesList);
    }, [citiesList]);

    const handleChangeCity = useCallback((newValue: SelectDropdownCity, index: number) => {
        const newCitiesList = citiesList;
        newCitiesList[index] = newValue;
        setCitiesList([...newCitiesList]);
        onChange(citiesList);
    }, [citiesList]);

    const removeCity = (index: number) => {
        const newCitiesList = citiesList;
        newCitiesList.splice(index, 1);
        setCitiesList([...newCitiesList]);
        onChange(citiesList);
    };

    return(
        <>
            <Flex justify={'space-between'} paddingY="4">
                <Text >Intermediate Cities</Text>
                <div><Button aria-label='Add intermediate city' size='xs' rightIcon={<AddIcon />} onClick={addCityForm}>Add</Button></div>
            </Flex>
            { citiesList?.map((city, index) =>
                <FormControl key={index} marginY="2" isRequired>
                    <HStack width="100%">
                        <div style={{ flexGrow: 1 }}>
                            <Select options={citiesSelection as any} value={city?.value && city} onChange={(newValue: any) => handleChangeCity(newValue, index)}  />
                        </div>
                        <IconButton aria-label='delete intermediate city' icon={<DeleteIcon />} onClick={() => removeCity(index)} />
                    </HStack>
                </FormControl>
            )}
        </>
    );
}

export default IntermediateCitiesFormControl;