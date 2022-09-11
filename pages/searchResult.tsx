import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Heading, HStack, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, useToast, Tr, Skeleton } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchDistanceQuery } from '../models/SearchDistanceQuery';
import useDistanceCalculation from '../hooks/useDistanceCalculation';
import { DistanceCalculationResult } from '../models/DistanceCalculationResult';

const SearchResult: NextPage = () => {
    const toast = useToast();
    const router = useRouter();
    const {calculateDistance, distanceResult, loading, error} = useDistanceCalculation();
    

    useEffect(() => {

        if (router.query) {
            const queryParams: SearchDistanceQuery = {
                origin: (router.query.origin as string),
                destination: router.query.destination as string,
                passengerQty: parseInt(router.query.passengerQty as string),
                date: router.query.date as string,
                intermediateCities: router.query.intermediateCities as string || ""
            };
            console.log(queryParams)
           
            calculateDistance(queryParams);
        }
        
        

        
    }, [router]);

    return(
        <>
            <Head>
                <title>How far is it - Search Results</title>
            </Head>
            <Container maxW='xxl' padding={0}>
                <HStack spacing={4} align="flex-start">
                    <Box bg='teal' w='80%' height="100vh" color='white' padding={4}>
                        <Box textAlign="right">
                            <Link href="/">Search again...</Link>
                        </Box>
                        <Heading>Search Params</Heading>
                        <Skeleton marginTop={8}  height="50px" isLoaded={!!distanceResult?.origin?.name}>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Tbody>
                                    <Tr>
                                            <Td>Origin</Td>
                                            <Td>
                                                { distanceResult?.origin?.name }
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Destination</Td>
                                            <Td>{ distanceResult?.destination?.name }</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Date</Td>
                                            <Td >{distanceResult?.date}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Number of Passengers</Td>
                                            <Td>{distanceResult?.passengerQty}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Skeleton>
                        <Skeleton marginTop={8} height="50px" isLoaded={!!distanceResult?.origin?.name} />
                        <Skeleton marginTop={8} height="50px" isLoaded={!!distanceResult?.origin?.name} />
                    </Box>
                    <Box w='100%' color='black' paddingTop={8}>
                        <Stack spacing={6}>
                            <Skeleton marginTop={8} height="50px" isLoaded={!!distanceResult?.totalDistance}>
                                <Heading>Total Distance</Heading>
                                <Text padding={3}>{distanceResult?.totalDistance} Km</Text>
                            </Skeleton>
                            
                            <Box paddingY={8}>
                                <Heading>Tracks</Heading>
                                <Skeleton height="50px" isLoaded={!!distanceResult?.totalDistance} >
                                    <TableContainer paddingTop={4}>
                                        <Table variant='simple'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Start Point</Th>
                                                    <Th>End Point</Th>
                                                    <Th>Distance</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {distanceResult?.tracks?.map(track => 
                                                    <Tr>
                                                        <Td>{track.origin.name}</Td>
                                                        <Td>{track.end.name}</Td>
                                                        <Td>{track.distance}</Td>
                                                    </Tr>
                                                )}
                                                
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Skeleton>
                                <Skeleton marginTop={8} height="50px" isLoaded={!!distanceResult?.totalDistance} />
                                <Skeleton marginTop={8} height="50px" isLoaded={!!distanceResult?.totalDistance} />
                            </Box>
                        </Stack>
                    </Box>
                </HStack>
            </Container>
        </>
    );
};

export default SearchResult;