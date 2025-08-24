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
        setCitiesList((prev) => {
            const next = [...prev, { label: "", value: "" }];
            onChange(next);
            return next;
        });
    }, [onChange]);

    const handleChangeCity = useCallback((newValue: SelectDropdownCity, index: number) => {
        setCitiesList((prev) => {
            const next = [...prev];
            next[index] = newValue;
            onChange(next);
            return next;
        });
    }, [onChange]);

    const removeCity = useCallback((index: number) => {
        setCitiesList((prev) => {
            const next = [...prev];
            next.splice(index, 1);
            onChange(next);
            return next;
        });
    }, [onChange]);

    return(
        <>
            <Flex justify={'space-between'} paddingY="4">
                <Text >Intermediate Cities</Text>
                <div><Button data-testid="add-intermediate" aria-label='Add intermediate city' size='xs' rightIcon={<AddIcon />} onClick={addCityForm}>Add</Button></div>
            </Flex>
            { citiesList?.map((city, index) =>
                <FormControl key={index} marginY="2" isRequired>
                    <HStack width="100%">
                        <div style={{ flexGrow: 1 }}>
                            <Select id={`form-intermedate-city-${index}`} options={citiesSelection as any} value={city?.value && city} onChange={(newValue: any) => handleChangeCity(newValue, index)}  />
                        </div>
                        <IconButton aria-label='delete intermediate city' icon={<DeleteIcon />} onClick={() => removeCity(index)} />
                    </HStack>
                </FormControl>
            )}
        </>
    );
}

export default IntermediateCitiesFormControl;