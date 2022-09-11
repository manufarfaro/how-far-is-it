import { FC, useState } from 'react';
import {
  Flex,
  InputRightElement,
  InputGroup,
  Stack,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  IconButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Skeleton,
  useToast
} from '@chakra-ui/react';
import Select from 'react-select';
import { SelectDropdownCity } from '../models/SelectDropdownCity';
import IntermediateCitiesFormControl from './IntermediateCitiesFormControl';
import { SearchDistanceQuery } from '../models/SearchDistanceQuery';


type SearchFormParams = {
    cities: SelectDropdownCity[];
    onSubmit: (params: SearchDistanceQuery) => void
}

const SearchForm: FC<SearchFormParams> = ({ cities, onSubmit }) => {
    const toast = useToast();
    const [cityOrigin, setCityOrigin] = useState<SelectDropdownCity>();
    const [cityDestination, setCityDestination] = useState<SelectDropdownCity>();
    const [intermediateCities, setIntermediateCities] = useState<{value: string, label: string}[]>([]);
    const [date, setDate] = useState<string>((new Date()).toISOString().split('T')[0]);
    const [passengerQty, setPassengerQty] = useState<number>(1);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!cityOrigin?.value || !cityDestination?.value || (intermediateCities.length && !intermediateCities.some(i => i.value != undefined)) || !date || !passengerQty ) {
            toast({
                title: 'Invalid Form',
                description: 'There are invalid fields in your form, please check them and try again...',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
            return;
        }
        const formParams: SearchDistanceQuery = {
            origin: cityOrigin?.value,
            destination: cityDestination?.value,
            intermediateCities: intermediateCities?.map(i => i.value).join(","),
            passengerQty,
            date
        };
        onSubmit(formParams);
    }

    return (
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Skeleton height="16" isLoaded={!!cities.length}>
                <FormControl id="cityOrigin" isRequired>
                    <FormLabel>Origin</FormLabel>
                    <Select options={cities} value={cityOrigin} onChange={(newValue: any) => setCityOrigin(newValue)}  />
                </FormControl>
            </Skeleton>
            
            <Skeleton isLoaded={!!cities.length}>
                <IntermediateCitiesFormControl cities={cities as any} onChange={(newValue: {value: string, label: string}[]) => setIntermediateCities(newValue)} />
            </Skeleton>
            
            <Skeleton height="16" isLoaded={!!cities.length}>
                <FormControl id="cityDestination" isRequired>
                    <FormLabel>Destination</FormLabel>
                    <Select options={cities} value={cityDestination} onChange={(newValue: any) => setCityDestination(newValue)}  />
                </FormControl>
            </Skeleton>
            
            <Skeleton height="16" isLoaded={!!cities.length}>
                <FormControl id="date" isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                    placeholder="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                    />
                </FormControl>
            </Skeleton>

            <Skeleton height="16" isLoaded={!!cities.length}>
                <FormControl id="passengerQty" isRequired>
                    <FormLabel>Number of Passengers</FormLabel>
                    <NumberInput value={passengerQty} onChange={(_, value) => setPassengerQty(value)} min={1} max={20}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </Skeleton>
            
            <Skeleton height="16" isLoaded={!!cities.length}>
                <Input type="submit" variant={'link'} value="Search" onClick={handleSubmit} />
            </Skeleton>
            
        </Stack>
    );
};

export default SearchForm;